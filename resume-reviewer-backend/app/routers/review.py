from typing import List

from fastapi import APIRouter, Depends, Form, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from app.core.config import settings
from app.db.database import get_db
from app.models.review import Review
from app.schemas.review import ReviewResponse, ReviewHistoryItem
from app.services.file_parser import extract_resume_text
from app.services.ollama_service import analyze_resume
from app.utils.prompt_builder import build_resume_review_prompt

router = APIRouter(prefix="/api/review", tags=["review"])


@router.post("/analyze", response_model=ReviewResponse)
async def analyze(
    job_role: str = Form(...),
    job_description: str = Form(...),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    if not job_role.strip() or not job_description.strip():
        raise HTTPException(status_code=400, detail="Job role and job description are required.")

    # 1. Extract text from the uploaded PDF/DOCX
    resume_text = await extract_resume_text(resume, settings.MAX_UPLOAD_SIZE_MB)

    # 2. Build the prompt for Gemma3
    prompt = build_resume_review_prompt(job_role, job_description, resume_text)

    # 3. Call Ollama and get a validated structured result
    result = analyze_resume(prompt)

    # 4. Persist to MySQL
    review = Review(
        job_role=job_role,
        job_description=job_description,
        resume_filename=resume.filename,
        resume_text=resume_text,
        match_percentage=result["match_percentage"],
        summary=result["summary"],
        strengths=result["strengths"],
        weaknesses=result["weaknesses"],
        suggestions=result["suggestions"],
        missing_keywords=result["missing_keywords"],
    )
    db.add(review)
    db.commit()
    db.refresh(review)

    return review


@router.get("/history", response_model=List[ReviewHistoryItem])
def get_history(db: Session = Depends(get_db)):
    reviews = db.query(Review).order_by(Review.created_at.desc()).all()
    return reviews


@router.get("/{review_id}", response_model=ReviewResponse)
def get_review(review_id: int, db: Session = Depends(get_db)):
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found.")
    return review
