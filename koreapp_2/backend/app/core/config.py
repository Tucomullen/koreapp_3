from typing import List, Optional, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "your-secret-key-change-in-production"
    
    DATABASE_URL: str = "postgresql+psycopg://user:password@localhost:5432/ai_agent_platform"
    POOL_SIZE: int = 10
    POOL_MAX_OVERFLOW: int = 20
    POOL_TIMEOUT: int = 30
    POOL_RECYCLE: int = 1800
    
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []
    ALLOWED_HOSTS: List[str] = ["localhost", "127.0.0.1"]
    
    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)
    
    AZURE_TENANT_ID: Optional[str] = None
    AZURE_CLIENT_ID: Optional[str] = None
    AZURE_CLIENT_SECRET: Optional[str] = None
    MICROSOFT_GRAPH_SCOPE: str = "https://graph.microsoft.com/.default"
    
    JWT_ALGORITHM: str = "RS256"
    JWT_AUDIENCE: Optional[str] = None
    JWT_ISSUER: Optional[str] = None
    
    OPENAI_API_KEY: Optional[str] = None
    LANGCHAIN_TRACING_V2: bool = False
    LANGCHAIN_API_KEY: Optional[str] = None
    
    OTEL_EXPORTER_OTLP_ENDPOINT: Optional[str] = None
    LOG_LEVEL: str = "INFO"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
