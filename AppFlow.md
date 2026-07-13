# App Flow and Screen Inventory: Skripsi Companion

## 1. User Journey Map (Primary Flows)

### Flow 1: Project Initialization & Paper Ingestion
1. **Authentication**: User logs in or registers.
2. **Dashboard**: User views existing projects or creates a new `Project` (e.g., "Thesis: Machine Learning in Healthcare").
3. **Workspace/Library**: User enters the project workspace and navigates to the Paper Library.
4. **Ingestion**: User clicks "Add Paper".
   - *Path A (PDF)*: Uploads a local PDF file (`sourceType: pdf_upload`).
   - *Path B (API)*: Searches Semantic Scholar/OpenAlex via DOI or Title (`sourceType: api`).
5. **Processing**: System queues the paper. UI shows a processing state (`Paper.status: processing`) while the backend extracts text, generates embeddings, and maps concepts.
6. **Completion**: Paper status updates to `completed`. User is notified and can begin reading.

### Flow 2: Adaptive Scrollytelling Reading & Synthesis
1. **Reader Entry**: User selects a `completed` paper from the library, opening the Scrollytelling Reader.
2. **Dynamic Reading**: The UI renders the narrative. Concepts with high `decayScore` (mastered) are automatically collapsed.
3. **Interaction**: 
   - User expands a collapsed concept to review it (signals mastery recalibration).
   - User scrolls to a section where a `Contradiction` is detected.
4. **Contradiction Resolution**: An inline panel slides out showing side-by-side quotes. User writes a `SynthesisNote` resolving the conflict.
5. **Contextual Q&A**: User opens the floating Q&A agent, asks a question about the current scroll depth, and receives an answer powered by the `Concept` memory graph.

### Flow 3: Memory Audit & Management
1. **Session End**: User finishes reading the paper or closes the reader.
2. **Memory Diff Review**: A summary modal/screen appears showing the `MemoryDiff` log for the session (what was promoted, archived, pinned).
3. **Manual Override**: User reviews the AI's decisions and manually pins a critical concept or archives an irrelevant one.
4. **Concept Graph Exploration**: User navigates to the Project's Concept Manager to view the entire knowledge graph, filter by status (`active`, `archived`, `pinned`), and review all `SynthesisNote` entries.

---

## 2. Screen Inventory

### 2.1 Global & Navigation
* **AuthScreen**: Login and Registration page.
* **DashboardScreen**: High-level overview of all user projects.
* **ProjectWorkspaceScreen**: The main hub for a specific project, containing tabs for Library, Concepts, and Notes.

### 2.2 Paper Ingestion & Library
* **PaperLibraryView**: List/grid of all papers in the current project with their processing status.
* **PaperIngestionModal**: Modal to upload a PDF or search the Semantic Scholar API.
* **PaperProcessingView**: Detailed view of a paper currently being parsed, showing extraction progress and concept mapping status.

### 2.3 The Reader Experience (Core)
* **ScrollytellingReaderScreen**: The immersive, scroll-triggered reading interface. Renders HTML/narrative chunks dynamically.
* **FloatingQAComponent**: A persistent, draggable overlay for context-aware Q&A.
* **ContradictionResolutionPanel**: An inline or slide-out panel triggered when cross-paper conflicts are detected, featuring side-by-side text and a note-taking area.

### 2.4 Memory & Synthesis Management
* **MemoryDiffPanelScreen**: Post-reading session audit screen detailing memory operations (promoted, archived, etc.) with manual override controls.
* **ConceptManagerScreen**: A comprehensive view of the project's Concept Memory Graph. Allows filtering, searching, and bulk status changes.
* **SynthesisNotesView**: A dedicated list/document view of all user-authored synthesis notes, linked to specific concepts and papers.

---

## 3. State & Data Requirements per Screen

### AuthScreen
* **Purpose**: Secure user access.
* **Data Requirements**: 
  * `User` (id, email/username, password hash).
* **States**: 
  * `Idle`: Default form state.
  * `Loading`: Submitting credentials.
  * `Error`: Invalid credentials or network failure.

### DashboardScreen
* **Purpose**: Display all projects and allow creation of new ones.
* **Data Requirements**: 
  * `Project` (id, name, createdAt, paper count, concept count).
  * `User` (id).
* **States**: 
  * `Empty`: No projects created yet.
  * `Loading`: Fetching project list.
  * `Populated`: Grid/list of projects.

### ProjectWorkspaceScreen (Library Tab)
* **Purpose**: Manage papers within a specific project scope.
* **Data Requirements**: 
  * `Project` (id, name).
  * `Paper` (id, title, authors, sourceType, status, createdAt).
* **States**: 
  * `Empty`: No papers added.
  * `Loading`: Fetching papers.
  * `Processing`: One or more papers have `Paper.status == 'processing'`.
  * `Populated`: List of papers with status badges (Pending, Processing, Completed, Failed).

### PaperIngestionModal
* **Purpose**: Ingest new literature via PDF or API.
* **Data Requirements**: 
  * `Project` (id).
  * `Paper` (title, abstract, sourceType, rawContent).
* **States**: 
  * `SelectSource`: Toggle between PDF Upload and API Search.
  * `Uploading`: PDF file being sent to backend.
  * `Searching`: Querying Semantic Scholar/OpenAlex.
  * `Success`: Paper created with `status: pending`.
  * `Error`: API rate limit hit or invalid PDF.

### ScrollytellingReaderScreen
* **Purpose**: Deliver the adaptive, scroll-triggered reading experience.
* **Data Requirements**: 
  * `Paper` (id, title, rawContent).
  * `Concept` (id, name, status, decayScore, frequencyScore). *Used to determine if a concept section should be collapsed based on mastery.*
  * `PaperConceptMap` (conceptId, contextSnippet).
* **States**: 
  * `LoadingNarrative`: Waiting for `qwen3.6-flash` to generate the initial HTML structure.
  * `Streaming`: Receiving narrative chunks via SSE/WebSocket.
  * `Interactive`: User is scrolling; sections expand/collapse based on `Concept.decayScore`.
  * `Error`: Narrative generation failed.

### FloatingQAComponent
* **Purpose**: Provide context-aware answers based on scroll depth and memory.
* **Data Requirements**: 
  * `Paper` (id).
  * `Concept` (id, name, embedding, recencyScore, importanceScore). *Used for smart vector retrieval.*
  * `SynthesisNote` (content).
* **States**: 
  * `Idle`: Chat interface ready.
  * `Retrieving`: Fetching relevant context from `pgvector` (Top-K based on decay/importance).
  * `Generating`: Streaming response from `qwen3.7-plus`.
  * `Error`: LLM timeout or retrieval failure.

### ContradictionResolutionPanel
* **Purpose**: Highlight and resolve cross-paper conflicts.
* **Data Requirements**: 
  * `Paper` (id, title) - *Current paper and conflicting paper.*
  * `PaperConceptMap` (contextSnippet) - *Side-by-side quotes.*
  * `SynthesisNote` (id, conceptId, content).
  * `Concept` (id).
* **States**: 
  * `Detected`: Conflict flagged by AI, showing side-by-side quotes.
  * `Drafting`: User typing in the synthesis note textarea.
  * `Saved`: Note successfully written and linked to the `Concept`.

### MemoryDiffPanelScreen
* **Purpose**: Transparent audit of AI memory operations post-reading.
* **Data Requirements**: 
  * `MemoryDiff` (id, sessionId, operationType, reasoning, createdAt).
  * `Concept` (id, name, status, decayScore).
* **States**: 
  * `Reviewing`: Displaying list of operations (Promoted, Archived, Pinned, Unpinned) with AI reasoning.
  * `Overriding`: User clicks to manually change a concept's status (e.g., unpining an archived concept).
  * `Confirmed`: Overrides saved to the database.

### ConceptManagerScreen
* **Purpose**: Visualize and manage the project's persistent memory graph.
* **Data Requirements**: 
  * `Concept` (id, name, description, status, recencyScore, frequencyScore, importanceScore, decayScore).
  * `PaperConceptMap` (paperId).
* **States**: 
  * `Loading`: Fetching all concepts and calculating graph layout.
  * `Filtered`: User filters by `ConceptStatus` (active, archived, pinned) or sorts by `decayScore`.
  * `Empty`: No concepts extracted yet.

### SynthesisNotesView
* **Purpose**: Review all user-authored critical notes for literature review drafting.
* **Data Requirements**: 
  * `SynthesisNote` (id, content, createdAt, updatedAt).
  * `Concept` (id, name) - *Linked concept context.*
  * `Paper` (id, title) - *Derived via PaperConceptMap.*
* **States**: 
  * `Empty`: No notes written.
  * `Grouped`: Notes grouped by `Concept` or chronological order.
  * `Editing`: User updating an existing note.