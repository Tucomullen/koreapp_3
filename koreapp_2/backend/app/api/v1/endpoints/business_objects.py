from typing import Any, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_db, get_current_active_user
from app.schemas.user import User
from app.schemas.business_object import (
    BusinessObject,
    BusinessObjectCreate,
    BusinessObjectUpdate,
    BusinessObjectList,
)
from app.services.business_object import business_object_service

router = APIRouter()


@router.get("/", response_model=BusinessObjectList)
async def read_business_objects(
    *,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    search: str = Query(None),
    type_filter: str = Query(None),
    status_filter: str = Query(None),
) -> Any:
    objects = await business_object_service.get_multi(
        db=db,
        tenant_id=current_user.tenant_id,
        skip=skip,
        limit=limit,
        search=search,
        type_filter=type_filter,
        status_filter=status_filter,
    )
    return objects


@router.post("/", response_model=BusinessObject)
async def create_business_object(
    *,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
    obj_in: BusinessObjectCreate,
) -> Any:
    obj = await business_object_service.create(
        db=db, obj_in=obj_in, tenant_id=current_user.tenant_id, created_by=current_user.id
    )
    return obj


@router.get("/{id}", response_model=BusinessObject)
async def read_business_object(
    *,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
    id: UUID,
) -> Any:
    obj = await business_object_service.get(
        db=db, id=id, tenant_id=current_user.tenant_id
    )
    if not obj:
        raise HTTPException(status_code=404, detail="Business object not found")
    return obj


@router.put("/{id}", response_model=BusinessObject)
async def update_business_object(
    *,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
    id: UUID,
    obj_in: BusinessObjectUpdate,
) -> Any:
    obj = await business_object_service.get(
        db=db, id=id, tenant_id=current_user.tenant_id
    )
    if not obj:
        raise HTTPException(status_code=404, detail="Business object not found")
    
    obj = await business_object_service.update(db=db, db_obj=obj, obj_in=obj_in)
    return obj


@router.delete("/{id}")
async def delete_business_object(
    *,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
    id: UUID,
) -> Any:
    obj = await business_object_service.get(
        db=db, id=id, tenant_id=current_user.tenant_id
    )
    if not obj:
        raise HTTPException(status_code=404, detail="Business object not found")
    
    await business_object_service.remove(db=db, id=id)
    return {"message": "Business object deleted successfully"}
