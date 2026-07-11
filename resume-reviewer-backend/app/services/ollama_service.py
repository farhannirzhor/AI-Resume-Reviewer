import json
import re

import requests
from fastapi import HTTPException

from app.core.config import settings

OLLAMA_GENERATE_ENDPOINT = f"{settings.OLLAMA_BASE_URL}/api/generate"

REQUIRED_KEYS = {
    "match_percentage",
    "summary",
    "strengths",
    "weaknesses",
    "suggestions",
    "missing_keywords",
}


def _extract_json_block(raw_text: str) -> str:
    """
    Gemma3 sometimes wraps JSON in ```json fences or adds stray text.
    This pulls out the first {...} block found in the response.
    """
    fenced = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", raw_text, re.DOTALL)
    if fenced:
        return fenced.group(1)

    brace = re.search(r"\{.*\}", raw_text, re.DOTALL)
    if brace:
        return brace.group(0)

    return raw_text


def _call_ollama(prompt: str) -> str:
    try:
        response = requests.post(
            OLLAMA_GENERATE_ENDPOINT,
            json={
                "model": settings.OLLAMA_MODEL,
                "prompt": prompt,
                "stream": False,
                "format": "json",   # ask Ollama to constrain output to valid JSON
                "options": {"temperature": 0.3},
            },
            timeout=120,
        )
        response.raise_for_status()
    except requests.exceptions.ConnectionError:
        raise HTTPException(
            status_code=503,
            detail="Could not connect to Ollama. Make sure 'ollama serve' is running locally.",
        )
    except requests.exceptions.Timeout:
        raise HTTPException(
            status_code=504,
            detail="Ollama took too long to respond. Try again.",
        )
    except requests.exceptions.HTTPError as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Ollama returned an error: {exc}",
        )

    data = response.json()
    return data.get("response", "")


def _parse_and_validate(raw_text: str) -> dict:
    json_str = _extract_json_block(raw_text)

    try:
        parsed = json.loads(json_str)
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=502,
            detail="The AI model returned an invalid response. Please try again.",
        )

    missing = REQUIRED_KEYS - parsed.keys()
    if missing:
        raise HTTPException(
            status_code=502,
            detail=f"The AI model's response was missing fields: {', '.join(missing)}.",
        )

    # normalize / clamp
    try:
        parsed["match_percentage"] = max(0, min(100, int(parsed["match_percentage"])))
    except (ValueError, TypeError):
        parsed["match_percentage"] = 0

    for list_field in ("strengths", "weaknesses", "suggestions", "missing_keywords"):
        if not isinstance(parsed.get(list_field), list):
            parsed[list_field] = []

    if not isinstance(parsed.get("summary"), str):
        parsed["summary"] = ""

    return parsed


def analyze_resume(prompt: str, max_retries: int = 1) -> dict:
    """
    Sends the prompt to the local Gemma3 model via Ollama and returns a
    validated dict matching the expected schema. Retries once on a parse failure.
    """
    last_error = None

    for attempt in range(max_retries + 1):
        raw_text = _call_ollama(prompt)
        try:
            return _parse_and_validate(raw_text)
        except HTTPException as exc:
            last_error = exc
            continue

    raise last_error
