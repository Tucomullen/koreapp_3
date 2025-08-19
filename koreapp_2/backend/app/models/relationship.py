from datetime import datetime
from uuid import uuid4

from sqlalchemy import Column, String, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import enum

from app.db.base import Base


class RelationshipType(str, enum.Enum):
    DEPENDS_ON = "depends_on"
    TRIGGERS = "triggers"
    CONTAINS = "contains"
    USES = "uses"
    PRODUCES = "produces"


class Relationship(Base):
    __tablename__ = "relationships"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    source_id = Column(UUID(as_uuid=True), ForeignKey("business_objects.id"), nullable=False)
    target_id = Column(UUID(as_uuid=True), ForeignKey("business_objects.id"), nullable=False)
    type = Column(Enum(RelationshipType), nullable=False)
    description = Column(String(500))
    tenant_id = Column(String(255), nullable=False, index=True)
    created_by = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    source_object = relationship(
        "BusinessObject", 
        foreign_keys=[source_id],
        back_populates="source_relationships"
    )
    target_object = relationship(
        "BusinessObject", 
        foreign_keys=[target_id],
        back_populates="target_relationships"
    )
