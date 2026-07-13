# Product Requirements Document (PRD): Skripsi Companion

## 1. Executive Summary
**Skripsi Companion** is an AI-powered research assistant designed to transform the way students and researchers consume academic literature. Unlike traditional paper summarizers that treat each document as an isolated event, Skripsi Companion builds a persistent, project-scoped "Concept Memory Graph." It transforms PDFs into personalized, interactive scrollytelling experiences that adapt to the user's knowledge level by skipping mastered concepts, flagging cross-paper contradictions, and facilitating literature review synthesis. 

Built specifically to address the core challenges of the MemoryAgent track, the system implements efficient memory storage/retrieval, timely forgetting of low-relevance information, and optimized context window management. Through a transparent "Memory Diff" panel, users maintain full auditability and control over the AI's memory, ensuring the tool grows smarter and more tailored to their specific research project over time.

## 2. Problem Statement & Goals

### Problem Statement
Students and junior researchers typically read 15–30+ papers for a single literature review. Current AI summarization tools suffer from three critical flaws:
1. **Redundancy:** They explain foundational concepts repeatedly, wasting time.
2. **Isolation:** They fail to cross-reference new papers against previously read literature, missing critical contradictions or syntheses.
3. **Opaque Memory:** They lack persistent, auditable memory, forcing users to start from zero in every session or suffer from context pollution across unrelated projects.

### Product Goals
* **Accelerate Literature Review:** Reduce reading time by dynamically condensing or skipping concepts the user has already mastered.
* **Enhance Synthesis Quality:** Automatically detect and highlight contradictions between papers, prompting critical thinking and structured note-taking.
* **Implement Intelligent Memory Management:** Achieve the MemoryAgent track objectives by balancing memory retention (storage/retrieval) with timely forgetting (decay scoring), ensuring the LLM context window is always populated with the most critical, relevant information.
* **Ensure Trust and Transparency:** Demystify AI memory through an auditable Memory Diff panel, allowing users to manually override, pin, or archive concepts.

## 3. Target Audience

### Primary Audience
* **Undergraduate (S1) and Graduate (S2) Students:** Individuals actively working on a thesis or capstone research project who need to read, synthesize, and critique 15–30+ academic papers during their literature review phase.

### Secondary Audience
* **Junior Research Assistants and Analysts:** Professionals who repeatedly work within the same specific research domain and require an assistant that accumulates deep domain context over time rather than resetting with every new session.

## 4. Core Features & User Stories

### 4.1 Adaptive Scrollytelling Paper Reader
The system ingests PDFs (via PyMuPDF) or fetches metadata/abstracts (via Semantic Scholar/OpenAlex) and generates a custom, scroll-triggered narrative using `qwen3.6-flash`. It dynamically condenses sections covering mastered concepts.
* **Contextual Expansion/Collapse:** Users can expand collapsed concepts for a refresher or manually collapse known sections, sending real-time recalibration signals to the memory graph.
* **Contextual Q&A:** A floating `qwen3.7-plus` agent is aware of the user's scroll depth, answering questions using the currently visible section combined with the historical memory graph.
* **User Story:** *As a graduate student, I want to read my papers in an interactive scrollytelling format that automatically skips explanations of concepts I already understand, so I can focus on the novel contributions of each paper without losing my flow.*

### 4.2 Project-Scoped Concept Memory Graph
Every extracted concept is tracked in a `pgvector` database strictly partitioned by `project_id`. Concepts are scored using a decay formula: `Recency × Access Frequency × Importance`. 
* **Passive Mastery Inference:** Mastery is inferred when a concept achieves a high frequency score across multiple papers.
* **Timely Forgetting:** Low-frequency, low-importance concepts gradually fade from active retrieval (archived, not deleted), optimizing the context window.
* **User Story:** *As a researcher working on multiple distinct projects, I want my reading history strictly scoped to my current thesis workspace, so my AI assistant doesn't confuse my current research with past, unrelated classes.*

### 4.3 Contradiction Detector & Inline Resolution
Powered by `qwen3.7-plus`, the system cross-references a newly read paper's claims and methodology against the project's stored memory.
* **Interactive Conflict Resolution:** When a conflict is flagged, an interactive panel displays side-by-side quotes from both papers.
* **Synthesis Note-Taking:** Users can write personal synthesis notes (e.g., "Paper A used a smaller dataset") directly in the panel. These notes are heavily weighted and saved to long-term memory.
* **User Story:** *As a student writing a literature review, I want the system to flag methodological or result contradictions between papers and let me write synthesis notes directly in the UI, so I can easily draft a critical review section later.*

### 4.4 Context-Aware Smart Retrieval
Instead of naive top-K similarity search, the retrieval mechanism combines embedding similarity (`text-embedding-v4`) with recency and importance scoring.
* **User Story:** *As a user asking a complex question about my research domain, I want the AI to retrieve the most critical and recent memories rather than just the most textually similar ones, so the answers are highly accurate and contextually relevant.*

### 4.5 Auditable Memory Diff Panel
At the end of each reading session, the system displays a transparent summary of memory operations.
* **Memory Operations:** Shows what was promoted to long-term memory, what was archived/forgotten, and the reasoning.
* **Manual Overrides:** Users can manually upvote (pin) or downvote (archive) specific extracted concepts, giving them total control over the agent's memory retention.
* **User Story:** *As a user, I want to see exactly what the AI learned and forgot after a reading session, and be able to manually adjust it, so I fully trust and understand the system's memory state.*

## 5. Non-Functional Requirements

### 5.1 Technology Stack & Deployment Constraints
* **Frontend:** Next.js deployed on Vercel. Must support custom scroll-triggered animations for the scrollytelling experience without compromising frame rates.
* **Backend:** Python (FastAPI) deployed on Alibaba Cloud ECS to satisfy hackathon deployment requirements.
* **Database:** PostgreSQL with the `pgvector` extension, hosted on Alibaba Cloud. Must enforce strict row-level or schema-level isolation by `project_id`.
* **LLM Stack (Qwen Cloud):** 
  * `qwen3.7-plus`: Multimodal PDF reading (text + figures/charts), contradiction detection, and complex reasoning.
  * `text-embedding-v4`: Generating concept memory embeddings for the vector store.
  * `qwen3.6-flash`: Generating scrollytelling HTML/narrative structures.
* **Data Sources:** Semantic Scholar API / OpenAlex for legal, free, structured metadata. PyMuPDF for local PDF text extraction.

### 5.2 Performance & Latency
* **Scrollytelling Rendering:** Scroll-triggered animations and narrative loading must maintain a smooth 60fps experience. Narrative chunks should be streamed to the frontend to minimize Time-to-First-Byte (TTFB).
* **Contextual Q&A:** The floating Q&A agent must respond within 2-3 seconds, utilizing optimized vector retrieval to keep LLM prompt processing times low.

### 5.3 Scalability & Architecture (Small Project Scale)
* **Database Isolation:** The `pgvector` implementation must efficiently handle per-project scoping. While the project scale is small, the schema must be designed to prevent context pollution across workspaces.
* **Context Window Optimization:** Smart retrieval must strictly limit the context window fed to `qwen3.7-plus` to the most critical memories (high recency/importance), preventing token overflow and reducing API costs.

### 5.4 Reliability & Error Handling
* **API Fallbacks:** If the Semantic Scholar/OpenAlex API is rate-limited or unavailable, the system must gracefully fallback to direct PDF upload and PyMuPDF parsing without breaking the user flow.
* **Memory Decay Stability:** The background process calculating concept decay scores (Recency × Frequency × Importance) must be resilient to failures and run asynchronously to avoid blocking the main reading experience.