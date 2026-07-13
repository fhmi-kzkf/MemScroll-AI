import os
import shutil
import requests
import uvicorn
from fastapi import FastAPI, Depends, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from database import engine, get_db
import models
from pipeline import process_paper

load_dotenv()

# Create DB tables
models.Base.metadata.create_all(bind=engine)
os.makedirs("uploads", exist_ok=True)

app = FastAPI(
    title="Skripsi Companion API",
    description="Backend for the Skripsi Companion adaptive scrollytelling reader.",
    version="0.1.0",
)

# CORS setup
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL], 
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Request Models
class TextRequest(BaseModel):
    text: str

class ImageTextRequest(BaseModel):
    image_url: str
    text: str

@app.get("/")
def read_root():
    return {"message": "Welcome to Skripsi Companion API"}

# --- Qwen Cloud Test Routes (DEVELOPMENT ONLY) ---
# These routes are disabled in production to prevent API key abuse.
# To enable, set environment variable ENABLE_TEST_ROUTES=true

if os.getenv("ENABLE_TEST_ROUTES", "false").lower() == "true":
    @app.post("/api/test/qwen-flash")
    def test_qwen_flash(req: TextRequest):
        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": req.text},
        ]
        headers = {
            'Authorization': f'Bearer {os.getenv("QWEN_API_KEY")}',
            'Content-Type': 'application/json'
        }
        data = {
            'model': 'qwen3.6-flash',
            'messages': messages,
        }
        response = requests.post(
            'https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions',
            headers=headers,
            json=data
        )
        if response.status_code == 200:
            resp_data = response.json()
            return {
                "status": "success",
                "response": resp_data['choices'][0]['message']['content']
            }
        else:
            return {"status": "error", "code": response.status_code, "message": response.text}

    @app.post("/api/test/qwen-plus")
    def test_qwen_plus(req: ImageTextRequest):
        messages = [
            {
                "role": "user",
                "content": [
                    {"type": "image_url", "image_url": {"url": req.image_url}},
                    {"type": "text", "text": req.text}
                ]
            }
        ]
        headers = {
            'Authorization': f'Bearer {os.getenv("QWEN_API_KEY")}',
            'Content-Type': 'application/json'
        }
        data = {
            'model': 'qwen3.7-plus',
            'messages': messages
        }
        response = requests.post(
            'https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions',
            headers=headers,
            json=data
        )
        if response.status_code == 200:
            resp_data = response.json()
            return {
                "status": "success", 
                "response": resp_data['choices'][0]['message']['content']
            }
        else:
             return {"status": "error", "code": response.status_code, "message": response.text}

    @app.post("/api/test/embedding")
    def test_embedding(req: TextRequest):
        headers = {
            'Authorization': f'Bearer {os.getenv("QWEN_API_KEY")}',
            'Content-Type': 'application/json'
        }
        data = {
            'model': 'text-embedding-v4',
            'input': req.text
        }
        response = requests.post(
            'https://dashscope-intl.aliyuncs.com/compatible-mode/v1/embeddings',
            headers=headers,
            json=data
        )
        if response.status_code == 200:
            resp_data = response.json()
            return {"status": "success", "embedding": resp_data['data'][0]['embedding']}
        else:
            return {"status": "error", "code": response.status_code, "message": response.text}

# --- Original Placeholders ---

@app.post("/api/projects")
def create_project(name: str = Form(...), db: Session = Depends(get_db)):
    import uuid
    pid = str(uuid.uuid4())
    project = models.Project(id=pid, name=name)
    db.add(project)
    db.commit()
    return {"status": "success", "id": pid}

@app.get("/api/projects")
def get_projects(db: Session = Depends(get_db)):
    projects = db.query(models.Project).all()
    result = []
    for p in projects:
        count = db.query(models.Paper).filter(models.Paper.project_id == p.id).count()
        result.append({
            "id": p.id,
            "title": p.name,
            "description": "Research Project",
            "paperCount": count
        })
    return {"projects": result}

@app.post("/api/papers/ingest")
async def ingest_paper(
    file: UploadFile = File(...), 
    project_id: str = Form(...),
    db: Session = Depends(get_db)
):
    import uuid
    from fastapi import HTTPException
    
    # File size limit: 20MB
    MAX_FILE_SIZE = 20 * 1024 * 1024
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large. Maximum size is 20MB.")
    
    # Secure filename against path traversal
    original_filename = os.path.basename(file.filename)
    if not original_filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
        
    safe_filename = f"{uuid.uuid4()}_{original_filename}"
    file_location = f"uploads/{safe_filename}"
    
    with open(file_location, "wb") as buffer:
        buffer.write(contents)
    
    # Ensure project exists
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        project = models.Project(id=project_id, name=f"Project {project_id}")
        db.add(project)
        db.commit()

    paper = models.Paper(
        project_id=project_id,
        title=file.filename,
        authors="Unknown Author",
        status="PENDING",
        file_path=file_location
    )
    db.add(paper)
    db.commit()
    db.refresh(paper)
    return {"status": "success", "paper_id": paper.id, "title": paper.title}

@app.get("/api/projects/{project_id}/papers")
def get_papers(project_id: str, db: Session = Depends(get_db)):
    papers = db.query(models.Paper).filter(models.Paper.project_id == project_id).all()
    return {"papers": papers}

@app.get("/api/papers/{paper_id}/status")
def get_paper_status(paper_id: int, db: Session = Depends(get_db)):
    paper = db.query(models.Paper).filter(models.Paper.id == paper_id).first()
    if not paper:
        return {"status": "not_found"}
    return {"status": paper.status}

@app.post("/api/papers/{paper_id}/process")
def process_paper_endpoint(paper_id: int, db: Session = Depends(get_db)):
    """Trigger the full 4-stage processing pipeline for a paper."""
    try:
        result = process_paper(paper_id, db)
        return {"status": "success", "result": result}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/api/papers/{paper_id}/scrollytelling")
def get_scrollytelling(paper_id: int, db: Session = Depends(get_db)):
    sections = db.query(models.ScrollytellingSection).filter(
        models.ScrollytellingSection.paper_id == paper_id
    ).order_by(models.ScrollytellingSection.order).all()
    return {
        "sections": [
            {
                "id": s.id,
                "order": s.order,
                "title": s.title,
                "type": s.section_type,
                "html_content": s.html_content
            }
            for s in sections
        ]
    }

@app.get("/api/papers/{paper_id}/concepts")
def get_paper_concepts(paper_id: int, db: Session = Depends(get_db)):
    concepts = db.query(models.Concept).filter(models.Concept.paper_id == paper_id).all()
    return {
        "concepts": [
            {
                "id": c.id,
                "name": c.name,
                "definition": c.definition,
                "importance": c.importance
            }
            for c in concepts
        ]
    }

@app.post("/api/papers/{paper_id}/recalibrate")
def recalibrate_memory(paper_id: str):
    return {"status": "success"}

@app.post("/api/qa/ask")
def ask_qa():
    return {"status": "streaming"}

@app.get("/api/projects/{project_id}/memory/diff")
def memory_diff(project_id: str):
    return {"operations": []}

@app.get("/api/projects/{project_id}/concepts")
def get_project_concepts(project_id: str, db: Session = Depends(get_db)):
    concepts = db.query(models.Concept).filter(models.Concept.project_id == project_id).all()
    # Aggregate concepts by name
    agg = {}
    for c in concepts:
        name = c.name.strip().title()
        if name not in agg:
            agg[name] = {"name": name, "papers": 0, "importance": 0.0, "decay": 1.0, "status": "active"}
        agg[name]["papers"] += 1
        agg[name]["importance"] += c.importance
    
    result = []
    for k, v in agg.items():
        v["importance"] = round(v["importance"] / v["papers"], 2)
        if v["papers"] > 1 or v["importance"] > 8:
            v["status"] = "pinned"
        elif v["papers"] == 1 and v["importance"] < 4:
            v["status"] = "archived"
        v["decay"] = round(min(1.0, v["papers"] * 0.3 + 0.1), 2)
        result.append(v)
        
    return {"concepts": sorted(result, key=lambda x: x["papers"], reverse=True)}

@app.get("/api/projects/{project_id}/notes")
def get_project_notes(project_id: str, db: Session = Depends(get_db)):
    notes = db.query(models.SynthesisNote).filter(models.SynthesisNote.project_id == project_id).all()
    return {
        "notes": [
            {
                "id": n.id,
                "concept": n.concept_name,
                "content": n.content,
                "date": n.created_at
            }
            for n in notes
        ]
    }

class NoteRequest(BaseModel):
    project_id: str
    concept_name: str
    content: str

@app.post("/api/notes")
def create_note(req: NoteRequest, db: Session = Depends(get_db)):
    from datetime import datetime
    note = models.SynthesisNote(
        project_id=req.project_id,
        concept_name=req.concept_name,
        content=req.content,
        created_at=datetime.now().strftime("%b %d, %Y")
    )
    db.add(note)
    db.commit()
    db.refresh(note)
    return {"status": "success", "id": note.id}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
