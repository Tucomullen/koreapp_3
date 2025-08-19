from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

from app.core.config import settings
from app.core.logging import setup_logging
from app.api.v1.api import api_router
from app.db.database import engine
from app.db.base import Base


@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_logging()
    yield


app = FastAPI(
    title="AI Agent Platform API",
    description="Customer-hosted AI agent platform with Microsoft 365 integration",
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=settings.ALLOWED_HOSTS,
)

app.include_router(api_router, prefix=settings.API_V1_STR)

FastAPIInstrumentor.instrument_app(app)


@app.get("/health/live")
async def health_live():
    return {"status": "ok", "service": "ai-agent-platform"}


@app.get("/health/ready")
async def health_ready():
    try:
        async with engine.begin() as conn:
            await conn.execute("SELECT 1")
        return {"status": "ready", "database": "connected"}
    except Exception as e:
        return {"status": "not ready", "database": "disconnected", "error": str(e)}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_config=None,
    )
