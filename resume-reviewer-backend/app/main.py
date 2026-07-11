from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.database import Base, engine
from app.models import review  # noqa: F401  (ensures model is registered before create_all)
from app.routers import review as review_router

app = FastAPI(
    title="AI Resume Reviewer API",
    description="Analyzes a resume against a job description using a local Gemma3 model via Ollama.",
    version="1.0.0",
)

# Create tables on startup (fine for dev; use Alembic migrations for production)
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(review_router.router)


@app.get("/")
def root():
    return {"status": "ok", "message": "AI Resume Reviewer API is running"}


@app.get("/health")
def health():
    return {"status": "healthy"}
