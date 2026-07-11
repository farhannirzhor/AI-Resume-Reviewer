from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # MySQL
    DATABASE_URL: str = "mysql+pymysql://root:yourpassword@localhost:3306/resume_reviewer"

    # Ollama
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "gemma3"

    # CORS
    FRONTEND_ORIGIN: str = "http://localhost:5173"

    # Upload
    MAX_UPLOAD_SIZE_MB: int = 5

    class Config:
        env_file = ".env"


settings = Settings()
