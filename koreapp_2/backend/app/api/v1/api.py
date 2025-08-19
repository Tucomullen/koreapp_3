from fastapi import APIRouter

from app.api.v1.endpoints import business_objects, analysis, health, ai

api_router = APIRouter()
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(business_objects.router, prefix="/objects", tags=["business-objects"])
api_router.include_router(analysis.router, prefix="/analysis", tags=["analysis"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])
