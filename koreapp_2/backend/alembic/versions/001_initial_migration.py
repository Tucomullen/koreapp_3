"""Initial migration

Revision ID: 001
Revises: 
Create Date: 2024-08-16 17:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table('systems',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('version', sa.String(length=50), nullable=True),
    sa.Column('endpoint_url', sa.String(length=500), nullable=True),
    sa.Column('configuration', sa.JSON(), nullable=True),
    sa.Column('tenant_id', sa.String(length=255), nullable=False),
    sa.Column('created_by', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_systems_name'), 'systems', ['name'], unique=False)
    op.create_index(op.f('ix_systems_tenant_id'), 'systems', ['tenant_id'], unique=False)
    
    op.create_table('business_objects',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('type', sa.Enum('WORKFLOW', 'DATA_OBJECT', 'PROCESS', 'INTEGRATION', 'REPORT', name='objecttype'), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('status', sa.Enum('ACTIVE', 'INACTIVE', 'PENDING', name='objectstatus'), nullable=True),
    sa.Column('complexity', sa.Enum('LOW', 'MEDIUM', 'HIGH', name='complexitylevel'), nullable=True),
    sa.Column('owner', sa.String(length=255), nullable=True),
    sa.Column('tags', sa.Text(), nullable=True),
    sa.Column('tenant_id', sa.String(length=255), nullable=False),
    sa.Column('created_by', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_business_objects_name'), 'business_objects', ['name'], unique=False)
    op.create_index(op.f('ix_business_objects_tenant_id'), 'business_objects', ['tenant_id'], unique=False)
    
    op.create_table('analyses',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('business_object_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('analysis_type', sa.String(length=100), nullable=False),
    sa.Column('summary', sa.Text(), nullable=True),
    sa.Column('insights', sa.JSON(), nullable=True),
    sa.Column('recommendations', sa.JSON(), nullable=True),
    sa.Column('confidence_score', sa.Float(), nullable=True),
    sa.Column('metrics', sa.JSON(), nullable=True),
    sa.Column('tenant_id', sa.String(length=255), nullable=False),
    sa.Column('created_by', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['business_object_id'], ['business_objects.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_analyses_tenant_id'), 'analyses', ['tenant_id'], unique=False)
    
    op.create_table('relationships',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('source_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('target_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('type', sa.Enum('DEPENDS_ON', 'TRIGGERS', 'CONTAINS', 'USES', 'PRODUCES', name='relationshiptype'), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=True),
    sa.Column('tenant_id', sa.String(length=255), nullable=False),
    sa.Column('created_by', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['source_id'], ['business_objects.id'], ),
    sa.ForeignKeyConstraint(['target_id'], ['business_objects.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_relationships_tenant_id'), 'relationships', ['tenant_id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_relationships_tenant_id'), table_name='relationships')
    op.drop_table('relationships')
    op.drop_index(op.f('ix_analyses_tenant_id'), table_name='analyses')
    op.drop_table('analyses')
    op.drop_index(op.f('ix_business_objects_tenant_id'), table_name='business_objects')
    op.drop_index(op.f('ix_business_objects_name'), table_name='business_objects')
    op.drop_table('business_objects')
    op.drop_index(op.f('ix_systems_tenant_id'), table_name='systems')
    op.drop_index(op.f('ix_systems_name'), table_name='systems')
    op.drop_table('systems')
