from typing import List, Optional
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.analysis import Analysis as AnalysisModel
from app.schemas.analysis import AnalysisCreate, AnalysisUpdate


class AnalysisService:
    async def get(
        self, db: AsyncSession, *, id: UUID, tenant_id: str
    ) -> Optional[AnalysisModel]:
        result = await db.execute(
            select(AnalysisModel).where(
                AnalysisModel.id == id,
                AnalysisModel.tenant_id == tenant_id,
            )
        )
        return result.scalar_one_or_none()

    async def get_by_object(
        self, db: AsyncSession, *, object_id: UUID, tenant_id: str
    ) -> List[AnalysisModel]:
        result = await db.execute(
            select(AnalysisModel)
            .where(
                AnalysisModel.business_object_id == object_id,
                AnalysisModel.tenant_id == tenant_id,
            )
            .order_by(AnalysisModel.created_at.desc())
        )
        return result.scalars().all()

    async def create(
        self,
        db: AsyncSession,
        *,
        obj_in: AnalysisCreate,
        tenant_id: str,
        created_by: str,
    ) -> AnalysisModel:
        db_obj = AnalysisModel(
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
        db_obj: AnalysisModel,
        obj_in: AnalysisUpdate,
    ) -> AnalysisModel:
        update_data = obj_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)

        await db.commit()
        await db.refresh(db_obj)
        return db_obj


analysis_service = AnalysisService()
