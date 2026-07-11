def build_resume_review_prompt(job_role: str, job_description: str, resume_text: str) -> str:
    """
    Builds a strict, JSON-only instruction prompt for the local LLM.
    Keeping the schema explicit + repeated reduces the chance of the model
    wrapping the answer in prose or markdown fences.
    """
    return f"""You are an expert technical recruiter and resume reviewer.

You will be given:
1. A target JOB ROLE
2. A JOB DESCRIPTION
3. A candidate's RESUME (plain text extracted from a PDF/DOCX)

Your task: evaluate how well the resume matches the job description, and return
ONLY a valid JSON object — no markdown, no code fences, no explanation text
before or after it. The JSON must exactly follow this schema:

{{
  "match_percentage": <integer 0-100>,
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<point 1>", "<point 2>", "..."],
  "weaknesses": ["<point 1>", "<point 2>", "..."],
  "suggestions": ["<specific, actionable rewrite/change suggestion>", "..."],
  "missing_keywords": ["<important keyword/skill from the JD missing in resume>", "..."]
}}

Rules:
- match_percentage must reflect how well skills, experience, and keywords align with the job description.
- strengths: what already matches well.
- weaknesses: concrete gaps (missing skills, weak phrasing, no metrics, poor structure, etc).
- suggestions: specific and actionable, e.g. "Add a quantifiable metric to the 'Backend Developer' bullet at XYZ Corp" rather than vague advice.
- missing_keywords: important terms/skills present in the job description but absent from the resume.
- Return between 3 and 8 items for each list field.
- Do not include any text outside the JSON object.

JOB ROLE:
{job_role}

JOB DESCRIPTION:
{job_description}

RESUME:
{resume_text}
"""
