from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Project(Base):
    __tablename__ = "projects"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    
    papers = relationship("Paper", back_populates="project")
    concepts = relationship("Concept", back_populates="project")
    notes = relationship("SynthesisNote", back_populates="project")

class Paper(Base):
    __tablename__ = "papers"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    project_id = Column(String, ForeignKey("projects.id"))
    title = Column(String)
    authors = Column(String)
    status = Column(String)  # PENDING, EXTRACTING, ANALYZING, EMBEDDING, COMPLETED, ERROR
    file_path = Column(String)
    extracted_text = Column(Text)  # Full text extracted from PDF

    project = relationship("Project", back_populates="papers")
    concepts = relationship("Concept", back_populates="paper")
    sections = relationship("ScrollytellingSection", back_populates="paper")

class Concept(Base):
    __tablename__ = "concepts"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    paper_id = Column(Integer, ForeignKey("papers.id"))
    project_id = Column(String, ForeignKey("projects.id"))
    name = Column(String)
    definition = Column(Text)
    importance = Column(Float, default=5.0)  # 1-10 scale
    embedding = Column(Text)  # JSON string of vector

    paper = relationship("Paper", back_populates="concepts")
    project = relationship("Project", back_populates="concepts")

class ScrollytellingSection(Base):
    __tablename__ = "scrollytelling_sections"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    paper_id = Column(Integer, ForeignKey("papers.id"))
    order = Column(Integer)  # Section ordering
    title = Column(String)
    section_type = Column(String)  # intro, concept, methodology, finding, conclusion
    html_content = Column(Text)  # Pre-rendered HTML content

    paper = relationship("Paper", back_populates="sections")

class SynthesisNote(Base):
    __tablename__ = "synthesis_notes"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    project_id = Column(String, ForeignKey("projects.id"))
    concept_name = Column(String)
    content = Column(Text)
    created_at = Column(String)

    project = relationship("Project", back_populates="notes")
