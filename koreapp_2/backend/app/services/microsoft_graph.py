from typing import Any, Dict, List, Optional
import httpx
from azure.identity import OnBehalfOfCredential

from app.core.config import settings
from app.core.logging import get_logger

logger = get_logger(__name__)


class MicrosoftGraphService:
    def __init__(self):
        self.base_url = "https://graph.microsoft.com/v1.0"
        
    async def get_access_token(self, user_token: str) -> str:
        if not all([settings.AZURE_TENANT_ID, settings.AZURE_CLIENT_ID, settings.AZURE_CLIENT_SECRET]):
            raise ValueError("Azure configuration is incomplete")
            
        credential = OnBehalfOfCredential(
            tenant_id=settings.AZURE_TENANT_ID,
            client_id=settings.AZURE_CLIENT_ID,
            client_secret=settings.AZURE_CLIENT_SECRET,
            user_assertion=user_token,
        )
        
        token = await credential.get_token(settings.MICROSOFT_GRAPH_SCOPE)
        return token.token

    async def get_user_profile(self, access_token: str) -> Dict[str, Any]:
        headers = {"Authorization": f"Bearer {access_token}"}
        
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{self.base_url}/me", headers=headers)
            response.raise_for_status()
            return response.json()

    async def get_user_files(
        self, access_token: str, limit: int = 10
    ) -> List[Dict[str, Any]]:
        headers = {"Authorization": f"Bearer {access_token}"}
        
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.base_url}/me/drive/root/children",
                headers=headers,
                params={"$top": limit}
            )
            response.raise_for_status()
            return response.json().get("value", [])

    async def send_teams_message(
        self, access_token: str, team_id: str, channel_id: str, message: str
    ) -> Dict[str, Any]:
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "body": {
                "content": message,
                "contentType": "text"
            }
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/teams/{team_id}/channels/{channel_id}/messages",
                headers=headers,
                json=payload
            )
            response.raise_for_status()
            return response.json()

    async def create_sharepoint_item(
        self, access_token: str, site_id: str, list_id: str, item_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/sites/{site_id}/lists/{list_id}/items",
                headers=headers,
                json={"fields": item_data}
            )
            response.raise_for_status()
            return response.json()

    async def get_calendar_events(
        self, access_token: str, limit: int = 10
    ) -> List[Dict[str, Any]]:
        headers = {"Authorization": f"Bearer {access_token}"}
        
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.base_url}/me/events",
                headers=headers,
                params={"$top": limit, "$orderby": "start/dateTime"}
            )
            response.raise_for_status()
            return response.json().get("value", [])


microsoft_graph_service = MicrosoftGraphService()
