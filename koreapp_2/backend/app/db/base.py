from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

from app.models.business_object import BusinessObject
from app.models.system import System
from app.models.relationship import Relationship
from app.models.analysis import Analysis
