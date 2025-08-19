from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

engine = create_async_engine(
    settings.DATABASE_URL,
    pool_size=settings.POOL_SIZE,
    max_overflow=settings.POOL_MAX_OVERFLOW,
    pool_timeout=settings.POOL_TIMEOUT,
    pool_recycle=settings.POOL_RECYCLE,
    echo=False,
)

AsyncSessionLocal = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)
