from datetime import datetime
from typing import Any, Dict, List, Optional
from uuid import UUID

from pydantic import BaseModel


class AnalysisBase(BaseModel):
    analysis_type: str
    summary: Optional[str] = None
    insights: Optional[List[Dict[str, Any]]] = None
    recommendations: Optional[List[Dict[str, Any]]] = None
    confidence_score: Optional[float] = None
    metrics: Optional[Dict[str, Any]] = None


class AnalysisCreate(AnalysisBase):
    business_object_id: UUID


class AnalysisUpdate(BaseModel):
    summary: Optional[str] = None
    insights: Optional[List[Dict[str, Any]]] = None
    recommendations: Optional[List[Dict[str, Any]]] = None
    confidence_score: Optional[float] = None
    metrics: Optional[Dict[str, Any]] = None


class AnalysisInDBBase(AnalysisBase):
    id: UUID
    business_object_id: UUID
    tenant_id: str
    created_by: str
    created_at: datetime

    class Config:
        from_attributes = True


class Analysis(AnalysisInDBBase):
    pass


class AnalysisInDB(AnalysisInDBBase):
    pass
