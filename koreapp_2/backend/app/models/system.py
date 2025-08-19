from datetime import datetime
from uuid import uuid4

from sqlalchemy import Column, String, Text, DateTime, Boolean, JSON
from sqlalchemy.dialects.postgresql import UUID

from app.db.base import Base


class System(Base):
    __tablename__ = "systems"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    name = Column(String(255), nullable=False, index=True)
    description = Column(Text)
    version = Column(String(50))
    endpoint_url = Column(String(500))
    configuration = Column(JSON)
    tenant_id = Column(String(255), nullable=False, index=True)
    created_by = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)
