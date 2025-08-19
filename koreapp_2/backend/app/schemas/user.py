from typing import List, Optional
from pydantic import BaseModel, EmailStr


class User(BaseModel):
    id: str
    tenant_id: Optional[str] = None
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    roles: List[str] = []
    is_active: bool = True

    class Config:
        from_attributes = True
