# Technical Requirements Document (TRD): Skripsi Companion

## 1. Architecture Overview

The system follows a decoupled, event-driven microservices-inspired architecture to handle heavy AI workloads, asynchronous memory processing, and real-time frontend interactions.

### High-Level Components
1. **Client Application (Next.js)**: Handles the UI, scrollytelling rendering, scroll-depth tracking, and real-time streaming of LLM narratives. Deployed on Vercel.
2. **API & Orchestration Layer (FastAPI)**: The core backend handling business logic, LLM prompt engineering, context window management, and API routing. Deployed on Alibaba Cloud ECS.
3. **Asynchronous Worker Layer**: Handles heavy, non-blocking tasks such as PDF parsing (PyMuPDF), metadata fetching, and background memory decay calculations.
4. **Data & Memory Layer (PostgreSQL + pgvector)**: Stores relational data, project scopes, and high-dimensional concept embeddings. Hosted on Alibaba Cloud RDS.
5. **External AI & Data Services**: 
   - **Qwen Cloud**: Powers LLM reasoning (`qwen3.7-plus`), narrative generation (`qwen3.6-flash`), and embeddings (`text-embedding-v4`).
   - **Academic APIs**: Semantic Scholar / OpenAlex for structured metadata retrieval.

### Data Flow
1. **Ingestion**: User inputs a DOI/URL or uploads a PDF. FastAPI triggers a worker to fetch metadata or parse the PDF.
2. **Extraction & Embedding**: Extracted text is chunked. `qwen3.6-flash` extracts concepts, and `text-embedding-v4` generates vectors. Data is saved to `pgvector` scoped to the `project_id`.
3. **Scrollytelling Generation**: Frontend requests the narrative. FastAPI retrieves active memories, constructs a context-aware prompt, and streams the HTML/scrollytelling structure via `qwen3.6-flash` using Server-Sent Events (SSE).
4. **Memory Decay**: A scheduled background task recalculates the `Recency × Access Frequency × Importance` decay score for all concepts in a project, archiving low-scoring nodes to optimize future context windows.

---

## 2. Technology Stack & Rationale

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend** | Next.js (App Router) | Excellent support for streaming SSR, client-side state management for scrollytelling, and seamless deployment to Vercel. |
| **Backend** | Python (FastAPI) | Native async support (crucial for streaming LLM responses and concurrent API calls), high performance, and seamless integration with Python AI/PDF libraries. |
| **Database** | PostgreSQL + `pgvector` | Provides robust relational integrity for project scoping alongside native, highly optimized vector similarity search. Hosted on Alibaba Cloud RDS. |
| **Task Queue** | Celery + Redis (or ARQ) | Required to offload heavy PDF parsing and asynchronous memory decay calculations without blocking the FastAPI event loop. |
| **LLM (Reasoning)** | `qwen3.7-plus` | Selected for its multimodal capabilities (reading charts/figures), complex reasoning for contradiction detection, and deep contextual understanding. |
| **LLM (Narrative)**| `qwen3.6-flash` | High throughput and low latency, ideal for generating the rapid, scroll-triggered HTML/narrative chunks required for the scrollytelling UI. |
| **Embeddings** | `text-embedding-v4` | High-dimensional, semantically rich embeddings optimized for academic and technical text, ensuring accurate concept retrieval. |
| **PDF Parsing** | PyMuPDF (fitz) | Fast, reliable local text and layout extraction, serving as the fallback when external metadata APIs fail. |

---

## 3. Data Model Overview

The database schema enforces strict isolation via `project_id` to prevent context pollution.

### Core Tables

**`projects`**
* `id` (UUID, PK)
* `user_id` (UUID, FK)
* `name` (VARCHAR)
* `created_at` (TIMESTAMP)

**`papers`**
* `id` (UUID, PK)
* `project_id` (UUID, FK)
* `title` (VARCHAR)
* `authors` (JSONB)
* `abstract` (TEXT)
* `source_type` (ENUM: 'api', 'pdf_upload')
* `raw_content` (TEXT) - Extracted text from PyMuPDF.
* `status` (ENUM: 'pending', 'processing', 'completed', 'failed')

**`concepts` (The Memory Graph)**
* `id` (UUID, PK)
* `project_id` (UUID, FK) - *Strict scoping enforced here.*
* `name` (VARCHAR)
* `description` (TEXT)
* `embedding` (VECTOR(1024)) - `text-embedding-v4` output.
* `recency_score` (FLOAT) - Decays over time.
* `frequency_score` (FLOAT) - Increments on access/mention.
* `importance_score` (FLOAT) - Weighted by user pins or contradiction flags.
* `decay_score` (FLOAT) - Calculated: `recency * frequency * importance`.
* `status` (ENUM: 'active', 'archived', 'pinned')
* `created_at` (TIMESTAMP)
* `updated_at` (TIMESTAMP)

**`paper_concept_map`**
* `paper_id` (UUID, FK)
* `concept_id` (UUID, FK)
* `context_snippet` (TEXT) - How the concept is used in this specific paper.

**`synthesis_notes`**
* `id` (UUID, PK)
* `project_id` (UUID, FK)
* `user_id` (UUID, FK)
* `concept_id` (UUID, FK, Nullable)
* `content` (TEXT)
* `created_at` (TIMESTAMP)

**`memory_diffs` (Audit Log)**
* `id` (UUID, PK)
* `project_id` (UUID, FK)
* `session_id` (UUID)
* `operation_type` (ENUM: 'promoted', 'archived', 'pinned', 'unpinned')
* `concept_id` (UUID, FK)
* `reasoning` (TEXT) - LLM-generated or user-provided reason.
* `created_at` (TIMESTAMP)

---

## 4. API Design / Integration Points

### Internal REST & Streaming APIs (FastAPI)

**Project & Paper Management**
* `POST /api/projects` - Create a new research workspace.
* `POST /api/papers/ingest` - Ingest paper via DOI/URL (triggers API fetch) or file upload (triggers PyMuPDF). Returns `paper_id`.
* `GET /api/papers/{id}/status` - Poll ingestion and processing status.

**Scrollytelling & Reading**
* `GET /api/papers/{id}/scrollytelling` - **SSE Endpoint**. Streams the interactive narrative generated by `qwen3.6-flash`. Accepts `scroll_depth` and `mastered_concepts` in the header/query to dynamically adjust output.
* `POST /api/papers/{id}/recalibrate` - Updates concept mastery status based on user UI interactions (expand/collapse).

**Contextual Q&A**
* `POST /api/qa/ask` - **SSE Endpoint**. Accepts `query`, `paper_id`, and `scroll_context`. Retrieves top-K concepts via smart retrieval, constructs prompt for `qwen3.7-plus`, and streams the response.

**Memory & Synthesis**
* `GET /api/projects/{id}/memory/diff` - Retrieves the memory operations log for the current session.
* `POST /api/concepts/{id}/override` - Manual user override (pin/archive) for a specific concept.
* `POST /api/notes` - Save synthesis notes, automatically boosting the `importance_score` of linked concepts.

### External Integration Points

* **Qwen Cloud API**: 
  * `/v1/chat/completions` (Models: `qwen3.7-plus`, `qwen3.6-flash`)
  * `/v1/embeddings` (Model: `text-embedding-v4`)
* **Semantic Scholar / OpenAlex API**: 
  * `GET /paper/{doi}` - Fetches structured metadata, abstract, and citations. Implements a circuit breaker; falls back to local PDF parsing on 429/5xx errors.

---

## 5. Security & Performance Constraints

### Security & Data Isolation
1. **Strict Project Scoping**: All database queries involving `concepts`, `papers`, and `notes` must include a `WHERE project_id = :current_project_id` clause. Row-Level Security (RLS) policies should be enabled in PostgreSQL as a secondary defense layer.
2. **Authentication & Authorization**: JWT-based auth for Next.js frontend. FastAPI validates tokens on every request. Users can only access projects