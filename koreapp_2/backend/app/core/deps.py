from typing import Generator, Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import verify_azure_token
from app.db.database import AsyncSessionLocal
from app.schemas.user import User

security = HTTPBearer()


async def get_db() -> Generator[AsyncSession, None, None]:
    async with AsyncSessionLocal() as session:
        yield session


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> User:
    try:
        payload = verify_azure_token(credentials.credentials)
        user_id = payload.get("oid")
        tenant_id = payload.get("tid")
        email = payload.get("preferred_username") or payload.get("email")
        name = payload.get("name")
        roles = payload.get("roles", [])
        
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials"
            )
            
        return User(
            id=user_id,
            tenant_id=tenant_id,
            email=email,
            name=name,
            roles=roles,
            is_active=True
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )


async def get_current_active_user(
    current_user: User = Depends(get_current_user),
) -> User:
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
