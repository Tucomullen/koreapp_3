import pytest
from httpx import AsyncClient
from unittest.mock import patch

from app.schemas.user import User


@pytest.mark.asyncio
async def test_create_business_object(client: AsyncClient):
    mock_user = User(
        id="test-user-id",
        tenant_id="test-tenant-id",
        email="test@example.com",
        name="Test User",
        roles=["user"],
        is_active=True
    )
    
    with patch("app.core.deps.get_current_active_user", return_value=mock_user):
        response = await client.post(
            "/api/v1/objects/",
            json={
                "name": "Test Object",
                "type": "workflow",
                "description": "Test description",
                "status": "active",
                "complexity": "medium"
            }
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "Test Object"
        assert data["type"] == "workflow"


@pytest.mark.asyncio
async def test_list_business_objects(client: AsyncClient):
    mock_user = User(
        id="test-user-id",
        tenant_id="test-tenant-id",
        email="test@example.com",
        name="Test User",
        roles=["user"],
        is_active=True
    )
    
    with patch("app.core.deps.get_current_active_user", return_value=mock_user):
        response = await client.get("/api/v1/objects/")
        
        assert response.status_code == 200
        data = response.json()
        assert "items" in data
        assert "total" in data
        assert isinstance(data["items"], list)
