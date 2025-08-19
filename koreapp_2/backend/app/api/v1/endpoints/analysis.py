from typing import Any, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_db, get_current_active_user
from app.schemas.user import User
from app.schemas.analysis import Analysis, AnalysisCreate
from app.services.analysis import analysis_service
from app.services.business_object import business_object_service

router = APIRouter()


@router.get("/{object_id}", response_model=List[Analysis])
async def get_object_analyses(
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
    
    analyses = await analysis_service.get_by_object(
        db=db, object_id=object_id, tenant_id=current_user.tenant_id
    )
    return analyses


@router.post("/{object_id}", response_model=Analysis)
async def create_analysis(
    *,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
    object_id: UUID,
    analysis_in: AnalysisCreate,
) -> Any:
    obj = await business_object_service.get(
        db=db, id=object_id, tenant_id=current_user.tenant_id
    )
    if not obj:
        raise HTTPException(status_code=404, detail="Business object not found")
    
    analysis_in.business_object_id = object_id
    analysis = await analysis_service.create(
        db=db,
        obj_in=analysis_in,
        tenant_id=current_user.tenant_id,
        created_by=current_user.id,
    )
    return analysis
