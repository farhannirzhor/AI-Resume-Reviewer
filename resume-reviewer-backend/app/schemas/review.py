from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict


class ReviewResponse(BaseModel):
    id: int
    job_role: str
    job_description: str
    resume_filename: str
    match_percentage: int
    summary: Optional[str] = None
    strengths: List[str] = []
    weaknesses: List[str] = []
    suggestions: List[str] = []
    missing_keywords: List[str] = []
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ReviewHistoryItem(BaseModel):
    id: int
    job_role: str
    match_percentage: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
