from typing import List, Optional
from uuid import UUID

from sqlalchemy import select, func, or_
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.business_object import BusinessObject as BusinessObjectModel
from app.schemas.business_object import (
    BusinessObjectCreate,
    BusinessObjectUpdate,
    BusinessObjectList,
)


class BusinessObjectService:
    async def get(
        self, db: AsyncSession, *, id: UUID, tenant_id: str
    ) -> Optional[BusinessObjectModel]:
        result = await db.execute(
            select(BusinessObjectModel).where(
                BusinessObjectModel.id == id,
                BusinessObjectModel.tenant_id == tenant_id,
                BusinessObjectModel.is_active == True,
            )
        )
        return result.scalar_one_or_none()

    async def get_multi(
        self,
        db: AsyncSession,
        *,
        tenant_id: str,
        skip: int = 0,
        limit: int = 100,
        search: Optional[str] = None,
        type_filter: Optional[str] = None,
        status_filter: Optional[str] = None,
    ) -> BusinessObjectList:
        query = select(BusinessObjectModel).where(
            BusinessObjectModel.tenant_id == tenant_id,
            BusinessObjectModel.is_active == True,
        )

        if search:
            query = query.where(
                or_(
                    BusinessObjectModel.name.ilike(f"%{search}%"),
                    BusinessObjectModel.description.ilike(f"%{search}%"),
                )
            )

        if type_filter:
            query = query.where(BusinessObjectModel.type == type_filter)

        if status_filter:
            query = query.where(BusinessObjectModel.status == status_filter)

        total_result = await db.execute(
            select(func.count()).select_from(query.subquery())
        )
        total = total_result.scalar()

        result = await db.execute(
            query.offset(skip).limit(limit).order_by(BusinessObjectModel.created_at.desc())
        )
        items = result.scalars().all()

        return BusinessObjectList(
            items=items,
            total=total,
            page=skip // limit + 1,
            size=limit,
            pages=(total + limit - 1) // limit,
        )

    async def create(
        self,
        db: AsyncSession,
        *,
        obj_in: BusinessObjectCreate,
        tenant_id: str,
        created_by: str,
    ) -> BusinessObjectModel:
        db_obj = BusinessObjectModel(
            **obj_in.model_dump(),
            tenant_id=tenant_id,
            created_by=created_by,
        )
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def update(
        self,
        db: AsyncSession,
        *,
        db_obj: BusinessObjectModel,
        obj_in: BusinessObjectUpdate,
    ) -> BusinessObjectModel:
        update_data = obj_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)

        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def remove(self, db: AsyncSession, *, id: UUID) -> None:
        result = await db.execute(
            select(BusinessObjectModel).where(BusinessObjectModel.id == id)
        )
        obj = result.scalar_one()
        obj.is_active = False
        await db.commit()


business_object_service = BusinessObjectService()
