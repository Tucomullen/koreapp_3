from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_db

router = APIRouter()


@router.get("/live")
async def health_live():
    return {"status": "ok", "service": "ai-agent-platform"}


@router.get("/ready")
async def health_ready(db: AsyncSession = Depends(get_db)):
    try:
        await db.execute("SELECT 1")
        return {"status": "ready", "database": "connected"}
    except Exception as e:
        return {"status": "not ready", "database": "disconnected", "error": str(e)}
