from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from sqlalchemy.sql import func

from app.db.database import Base


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)

    job_role = Column(String(255), nullable=False)
    job_description = Column(Text, nullable=False)

    resume_filename = Column(String(255), nullable=False)
    resume_text = Column(Text, nullable=False)

    match_percentage = Column(Integer, nullable=False)
    summary = Column(Text, nullable=True)

    strengths = Column(JSON, nullable=True)      # list[str]
    weaknesses = Column(JSON, nullable=True)      # list[str]
    suggestions = Column(JSON, nullable=True)     # list[str]
    missing_keywords = Column(JSON, nullable=True)  # list[str]

    created_at = Column(DateTime(timezone=True), server_default=func.now())
