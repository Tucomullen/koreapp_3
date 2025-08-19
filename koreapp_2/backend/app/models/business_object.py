from datetime import datetime
from typing import Optional
from uuid import uuid4

from sqlalchemy import Column, String, Text, DateTime, Enum, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import enum

from app.db.base import Base


class ObjectType(str, enum.Enum):
    WORKFLOW = "workflow"
    DATA_OBJECT = "data_object"
    PROCESS = "process"
    INTEGRATION = "integration"
    REPORT = "report"


class ObjectStatus(str, enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    PENDING = "pending"


class ComplexityLevel(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class BusinessObject(Base):
    __tablename__ = "business_objects"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    name = Column(String(255), nullable=False, index=True)
    type = Column(Enum(ObjectType), nullable=False)
    description = Column(Text)
    status = Column(Enum(ObjectStatus), default=ObjectStatus.PENDING)
    complexity = Column(Enum(ComplexityLevel), default=ComplexityLevel.LOW)
    owner = Column(String(255))
    tags = Column(Text)
    tenant_id = Column(String(255), nullable=False, index=True)
    created_by = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)

    analyses = relationship("Analysis", back_populates="business_object")
    source_relationships = relationship(
        "Relationship", 
        foreign_keys="Relationship.source_id",
        back_populates="source_object"
    )
    target_relationships = relationship(
        "Relationship", 
        foreign_keys="Relationship.target_id",
        back_populates="target_object"
    )
