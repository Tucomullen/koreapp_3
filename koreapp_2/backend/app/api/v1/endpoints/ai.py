from typing import Any, Dict
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_db, get_current_active_user
from app.schemas.user import User
from app.services.business_object import business_object_service
from app.ai.orchestrator import AIOrchestrator

router = APIRouter()


@router.post("/analyze/{object_id}")
async def analyze_object(
    *,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
    object_id: UUID,
) -> Any:
    obj = await business_object_service.get(
        db=db, id=object_id, tenant_id=current_user.tenant_id
    )
    if not obj:
        raise HTTPException(status_code=404, detail="Business object not found")
    
    orchestrator = AIOrchestrator()
    analysis = await orchestrator.analyze_object(obj)
    
    return {
        "object_id": object_id,
        "analysis": analysis,
        "status": "completed"
    }


@router.post("/chat")
async def chat_with_ai(
    *,
    current_user: User = Depends(get_current_active_user),
    message: Dict[str, Any],
) -> Any:
    orchestrator = AIOrchestrator()
    response = await orchestrator.chat(
        message=message.get("message", ""),
        context=message.get("context", {}),
        user_id=current_user.id,
    )
    
    return {
        "response": response,
        "timestamp": "2024-08-16T16:57:44Z"
    }


@router.post("/optimize/{object_id}")
async def optimize_object(
    *,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
    object_id: UUID,
) -> Any:
    obj = await business_object_service.get(
        db=db, id=object_id, tenant_id=current_user.tenant_id
    )
    if not obj:
        raise HTTPException(status_code=404, detail="Business object not found")
    
    orchestrator = AIOrchestrator()
    optimization = await orchestrator.optimize_object(obj)
    
    return {
        "object_id": object_id,
        "optimization": optimization,
        "status": "completed"
    }
