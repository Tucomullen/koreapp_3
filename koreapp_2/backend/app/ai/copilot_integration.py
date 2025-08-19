from typing import Any, Dict, List
from datetime import datetime

from app.core.logging import get_logger

logger = get_logger(__name__)


class CopilotConnectorSchema:
    @staticmethod
    def generate_external_item_schema() -> Dict[str, Any]:
        return {
            "baseType": "microsoft.graph.externalItem",
            "properties": {
                "title": {
                    "type": "String",
                    "isSearchable": True,
                    "isRetrievable": True,
                    "isQueryable": True
                },
                "description": {
                    "type": "String", 
                    "isSearchable": True,
                    "isRetrievable": True
                },
                "objectType": {
                    "type": "String",
                    "isSearchable": True,
                    "isRetrievable": True,
                    "isQueryable": True,
                    "isRefinable": True
                },
                "complexity": {
                    "type": "String",
                    "isRetrievable": True,
                    "isQueryable": True,
                    "isRefinable": True
                },
                "status": {
                    "type": "String",
                    "isRetrievable": True,
                    "isQueryable": True,
                    "isRefinable": True
                },
                "owner": {
                    "type": "String",
                    "isSearchable": True,
                    "isRetrievable": True,
                    "isQueryable": True
                },
                "lastModified": {
                    "type": "DateTime",
                    "isRetrievable": True,
                    "isQueryable": True,
                    "isRefinable": True
                },
                "tags": {
                    "type": "StringCollection",
                    "isSearchable": True,
                    "isRetrievable": True,
                    "isQueryable": True
                },
                "deepLink": {
                    "type": "String",
                    "isRetrievable": True
                }
            }
        }

    @staticmethod
    def create_external_item(business_object: Any, base_url: str) -> Dict[str, Any]:
        return {
            "id": str(business_object.id),
            "content": {
                "value": f"{business_object.name}\n\n{business_object.description or ''}",
                "type": "text"
            },
            "properties": {
                "title": business_object.name,
                "description": business_object.description or "",
                "objectType": business_object.type,
                "complexity": business_object.complexity,
                "status": business_object.status,
                "owner": business_object.owner or "",
                "lastModified": business_object.updated_at.isoformat(),
                "tags": business_object.tags.split(",") if business_object.tags else [],
                "deepLink": f"{base_url}/objects/{business_object.id}"
            },
            "acl": [
                {
                    "type": "user",
                    "value": business_object.created_by,
                    "accessType": "grant"
                },
                {
                    "type": "group", 
                    "value": f"tenant-{business_object.tenant_id}",
                    "accessType": "grant"
                }
            ]
        }


class CopilotActionSchema:
    @staticmethod
    def generate_openapi_spec(base_url: str) -> Dict[str, Any]:
        return {
            "openapi": "3.0.0",
            "info": {
                "title": "AI Agent Platform API",
                "description": "API for Microsoft Copilot integration with AI Agent Platform",
                "version": "1.0.0"
            },
            "servers": [
                {
                    "url": base_url,
                    "description": "AI Agent Platform API Server"
                }
            ],
            "security": [
                {
                    "BearerAuth": []
                }
            ],
            "components": {
                "securitySchemes": {
                    "BearerAuth": {
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT"
                    }
                }
            },
            "paths": {
                "/api/v1/objects": {
                    "get": {
                        "summary": "List business objects",
                        "description": "Retrieve a list of business objects with optional filtering",
                        "operationId": "listBusinessObjects",
                        "parameters": [
                            {
                                "name": "search",
                                "in": "query",
                                "description": "Search term for filtering objects",
                                "schema": {"type": "string"}
                            },
                            {
                                "name": "type_filter",
                                "in": "query", 
                                "description": "Filter by object type",
                                "schema": {"type": "string"}
                            },
                            {
                                "name": "limit",
                                "in": "query",
                                "description": "Maximum number of results",
                                "schema": {"type": "integer", "default": 10}
                            }
                        ],
                        "responses": {
                            "200": {
                                "description": "List of business objects",
                                "content": {
                                    "application/json": {
                                        "schema": {
                                            "type": "object",
                                            "properties": {
                                                "items": {
                                                    "type": "array",
                                                    "items": {"$ref": "#/components/schemas/BusinessObject"}
                                                },
                                                "total": {"type": "integer"}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/api/v1/objects/{id}": {
                    "get": {
                        "summary": "Get business object details",
                        "description": "Retrieve detailed information about a specific business object",
                        "operationId": "getBusinessObject",
                        "parameters": [
                            {
                                "name": "id",
                                "in": "path",
                                "required": True,
                                "description": "Business object ID",
                                "schema": {"type": "string", "format": "uuid"}
                            }
                        ],
                        "responses": {
                            "200": {
                                "description": "Business object details",
                                "content": {
                                    "application/json": {
                                        "schema": {"$ref": "#/components/schemas/BusinessObject"}
                                    }
                                }
                            }
                        }
                    }
                },
                "/api/v1/ai/analyze/{object_id}": {
                    "post": {
                        "summary": "Analyze business object",
                        "description": "Perform AI analysis on a business object",
                        "operationId": "analyzeBusinessObject",
                        "parameters": [
                            {
                                "name": "object_id",
                                "in": "path",
                                "required": True,
                                "description": "Business object ID to analyze",
                                "schema": {"type": "string", "format": "uuid"}
                            }
                        ],
                        "responses": {
                            "200": {
                                "description": "Analysis results",
                                "content": {
                                    "application/json": {
                                        "schema": {
                                            "type": "object",
                                            "properties": {
                                                "summary": {"type": "string"},
                                                "insights": {
                                                    "type": "array",
                                                    "items": {"type": "string"}
                                                },
                                                "recommendations": {
                                                    "type": "array", 
                                                    "items": {"type": "string"}
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }


class CopilotIntegrationService:
    def __init__(self):
        self.connector_schema = CopilotConnectorSchema()
        self.action_schema = CopilotActionSchema()

    async def create_connection_schema(self, connection_id: str) -> Dict[str, Any]:
        return {
            "id": connection_id,
            "name": "AI Agent Platform Connector",
            "description": "Connects Microsoft Copilot to AI Agent Platform data",
            "state": "ready",
            "configuration": {
                "authorizedAppIds": ["your-app-id"]
            },
            "schema": self.connector_schema.generate_external_item_schema()
        }

    async def index_business_objects(
        self, business_objects: List[Any], base_url: str
    ) -> List[Dict[str, Any]]:
        indexed_items = []
        
        for obj in business_objects:
            external_item = self.connector_schema.create_external_item(obj, base_url)
            indexed_items.append(external_item)
            
        logger.info(f"Indexed {len(indexed_items)} business objects for Copilot")
        return indexed_items

    def get_openapi_spec(self, base_url: str) -> Dict[str, Any]:
        return self.action_schema.generate_openapi_spec(base_url)


copilot_integration_service = CopilotIntegrationService()
