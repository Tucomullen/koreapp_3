from datetime import datetime
from uuid import uuid4

from sqlalchemy import Column, String, Text, DateTime, ForeignKey, JSON, Float
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.db.base import Base


class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    business_object_id = Column(UUID(as_uuid=True), ForeignKey("business_objects.id"), nullable=False)
    analysis_type = Column(String(100), nullable=False)
    summary = Column(Text)
    insights = Column(JSON)
    recommendations = Column(JSON)
    confidence_score = Column(Float)
    metrics = Column(JSON)
    tenant_id = Column(String(255), nullable=False, index=True)
    created_by = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    business_object = relationship("BusinessObject", back_populates="analyses")
