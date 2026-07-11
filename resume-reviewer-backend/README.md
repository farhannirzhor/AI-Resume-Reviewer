# AI Resume Reviewer — Backend

FastAPI + MySQL + Ollama(Gemma3) backend that analyzes a resume (PDF/DOCX)
against a job description and returns a match percentage, strengths,
weaknesses, and actionable suggestions.

## 1. Project structure

```
resume-reviewer-backend/
├── app/
│   ├── main.py                  # FastAPI app entrypoint
│   ├── core/
│   │   └── config.py            # env-based settings
│   ├── db/
│   │   └── database.py          # SQLAlchemy engine/session
│   ├── models/
│   │   └── review.py            # Review table model
│   ├── schemas/
│   │   └── review.py            # Pydantic response models
│   ├── services/
│   │   ├── file_parser.py       # PDF/DOCX -> text extraction
│   │   └── ollama_service.py    # calls Gemma3 via Ollama, validates JSON
│   ├── routers/
│   │   └── review.py            # /api/review endpoints
│   └── utils/
│       └── prompt_builder.py    # LLM prompt template
├── requirements.txt
├── .env.example
└── README.md
```

## 2. Prerequisites

- Python 3.10+
- MySQL Server running locally
- Ollama installed, with the Gemma3 model pulled:
  ```
  ollama pull gemma3
  ollama serve
  ```

## 3. Setup steps

### Step 1 — Create virtual environment
```bash
cd resume-reviewer-backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Step 2 — Create the MySQL database
```sql
CREATE DATABASE resume_reviewer CHARACTER SET utf8mb4;
```

### Step 3 — Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` and set your real MySQL username/password:
```
DATABASE_URL=mysql+pymysql://root:yourpassword@localhost:3306/resume_reviewer
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=gemma3
FRONTEND_ORIGIN=http://localhost:5173
```

### Step 4 — Run the server
```bash
uvicorn app.main:app --reload --port 8000
```

Tables are auto-created on first run via `Base.metadata.create_all()`.

### Step 5 — Test it
Open **http://localhost:8000/docs** for interactive Swagger UI.

Or with curl:
```bash
curl -X POST http://localhost:8000/api/review/analyze \
  -F "job_role=Backend Developer" \
  -F "job_description=We need a Python/FastAPI developer with MySQL and REST API experience..." \
  -F "resume=@/path/to/resume.pdf"
```

## 4. API Endpoints

| Method | Endpoint                  | Description                                   |
|--------|----------------------------|------------------------------------------------|
| POST   | `/api/review/analyze`      | Upload resume + job info, get AI analysis     |
| GET    | `/api/review/history`      | List all past reviews (id, role, %, date)     |
| GET    | `/api/review/{review_id}`  | Fetch a specific past review's full result    |

### `POST /api/review/analyze` — multipart/form-data
| Field             | Type   | Required |
|-------------------|--------|----------|
| job_role          | string | yes      |
| job_description   | string | yes      |
| resume            | file (.pdf or .docx) | yes |

### Response shape (all endpoints)
```json
{
  "id": 1,
  "job_role": "Backend Developer",
  "job_description": "...",
  "resume_filename": "resume.pdf",
  "match_percentage": 78,
  "summary": "Solid backend fundamentals but missing cloud deployment experience...",
  "strengths": ["Strong Python/FastAPI background", "..."],
  "weaknesses": ["No mention of Docker/Kubernetes", "..."],
  "suggestions": ["Add a bullet quantifying API latency improvements at XYZ Corp", "..."],
  "missing_keywords": ["AWS", "CI/CD", "Docker"],
  "created_at": "2026-07-11T10:00:00"
}
```

## 5. Notes on design decisions

- **No auth layer** — per current scope, the app is open (no login/JWT). Add
  the auth phase back later if you want per-user history.
- **`format: "json"`** is passed to Ollama to constrain Gemma3's output,
  plus a regex fallback + one retry in `ollama_service.py` in case the model
  still wraps the JSON in prose or code fences.
- **Scanned/image PDFs** will fail extraction (no OCR yet) — the API returns
  a clear 400 error in that case telling the user to upload a text-based file.
- **CORS** is restricted to `FRONTEND_ORIGIN` from `.env` — update this to
  match wherever your React dev server runs.
