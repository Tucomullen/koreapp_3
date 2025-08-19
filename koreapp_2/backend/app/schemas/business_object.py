from datetime import datetime
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel

from app.models.business_object import ObjectType, ObjectStatus, ComplexityLevel


class BusinessObjectBase(BaseModel):
    name: str
    type: ObjectType
    description: Optional[str] = None
    status: ObjectStatus = ObjectStatus.PENDING
    complexity: ComplexityLevel = ComplexityLevel.LOW
    owner: Optional[str] = None
    tags: Optional[str] = None


class BusinessObjectCreate(BusinessObjectBase):
    pass


class BusinessObjectUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[ObjectType] = None
    description: Optional[str] = None
    status: Optional[ObjectStatus] = None
    complexity: Optional[ComplexityLevel] = None
    owner: Optional[str] = None
    tags: Optional[str] = None


class BusinessObjectInDBBase(BusinessObjectBase):
    id: UUID
    tenant_id: str
    created_by: str
    created_at: datetime
    updated_at: datetime
    is_active: bool

    class Config:
        from_attributes = True


class BusinessObject(BusinessObjectInDBBase):
    pass


class BusinessObjectInDB(BusinessObjectInDBBase):
    pass


class BusinessObjectList(BaseModel):
    items: List[BusinessObject]
    total: int
    page: int
    size: int
    pages: int
