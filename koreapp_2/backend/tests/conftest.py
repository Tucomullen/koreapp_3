import asyncio
import pytest
import pytest_asyncio
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.core.deps import get_db
from app.db.base import Base

TEST_DATABASE_URL = "postgresql+psycopg://postgres:postgres@localhost:5432/test_db"

engine = create_async_engine(TEST_DATABASE_URL, echo=False)
TestingSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


@pytest_asyncio.fixture(scope="session")
async def db_engine():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield engine
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest_asyncio.fixture
async def db_session(db_engine):
    async with TestingSessionLocal() as session:
        yield session


@pytest_asyncio.fixture
async def client(db_session):
    async def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db
    
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac
    
    app.dependency_overrides.clear()


@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()
