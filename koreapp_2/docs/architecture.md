# AI Agent Platform - Architecture Overview

## System Architecture

The AI Agent Platform follows a modern, cloud-native architecture designed for customer-hosted single-tenant deployments. Each client receives their own isolated instance running in their Azure tenant.

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (React)       │◄──►│   (FastAPI)     │◄──►│ (PostgreSQL)    │
│                 │    │                 │    │                 │
│ • SSO Auth      │    │ • JWT Validation│    │ • Multi-tenant  │
│ • 8 Main Pages  │    │ • AI Orchestr.  │    │ • Migrations    │
│ • Teams/SP      │    │ • Graph API     │    │ • Connection    │
│   Embeddable    │    │ • Health Checks │    │   Pooling       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  Microsoft 365  │
                    │                 │
                    │ • Graph API     │
                    │ • Teams         │
                    │ • SharePoint    │
                    │ • Copilot       │
                    └─────────────────┘
```

## Core Components

### 1. Frontend (React + TypeScript)

**Technology Stack:**
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- @azure/msal-react for authentication
- Recharts for data visualization

**Key Features:**
- Microsoft Entra ID Single Sign-On
- Dark theme with cyan accents
- Responsive design
- Teams/SharePoint embeddable
- 8 main application pages

**Pages:**
1. **LoginPage** - Microsoft SSO authentication
2. **DashboardPage** - Overview with metrics and charts
3. **KnowledgeExplorerPage** - AI chat interface
4. **ObjectDetailPage** - 360° object view with AI analysis
5. **ObjectListPage** - Searchable object management
6. **ObjectFormPage** - CRUD operations
7. **StrategicMetricsPage** - Business KPIs and ROI tracking
8. **SettingsPage** - Configuration and preferences

### 2. Backend (FastAPI + Python)

**Technology Stack:**
- FastAPI with async/await support
- SQLAlchemy 2.x ORM
- Alembic for database migrations
- LangGraph for AI orchestration
- Microsoft Graph SDK
- OpenTelemetry for observability

**Architecture Layers:**
```
┌─────────────────────────────────────────────────────────┐
│                    API Layer                            │
│  • REST endpoints • JWT validation • Rate limiting      │
├─────────────────────────────────────────────────────────┤
│                  Service Layer                          │
│  • Business logic • AI orchestration • Graph API       │
├─────────────────────────────────────────────────────────┤
│                   Data Layer                            │
│  • SQLAlchemy models • Repository pattern • Caching    │
└─────────────────────────────────────────────────────────┘
```

**AI Orchestration (LangGraph):**
- **Planner**: Strategic planning and task decomposition
- **DB-Architect**: Database design and optimization
- **Backend-Engineer**: API development and testing
- **QA-Tester**: Quality assurance and validation

### 3. Database (PostgreSQL)

**Configuration:**
- PostgreSQL Flexible Server on Azure
- Connection pooling with configurable limits
- Automated backups and point-in-time recovery
- Single database per customer (tenant isolation)

**Schema Design:**
- `business_objects` - Core business entities
- `systems` - External system integrations
- `relationships` - Object dependencies
- `analyses` - AI analysis results
- Tenant-scoped data with `tenant_id` column

### 4. Microsoft 365 Integration

**Authentication Flow:**
```
User → Frontend → Entra ID → JWT Token → Backend → Graph API (OBO)
```

**Integration Patterns:**
- **On-Behalf-Of (OBO)**: Backend acts on user's behalf
- **Graph API**: Access to M365 services
- **Webhooks**: Real-time change notifications
- **Copilot Integration**: Data indexing and actions

**Supported Services:**
- OneDrive/SharePoint (file operations)
- Teams (messaging and channels)
- Outlook (email and calendar)
- Graph Connectors (data indexing)

## Security Architecture

### Authentication & Authorization

1. **Frontend Authentication:**
   - Microsoft Entra ID with PKCE flow
   - JWT tokens with automatic refresh
   - Session management with MSAL

2. **Backend Authorization:**
   - JWT validation with signature verification
   - Issuer and audience validation
   - Role-based access control (RBAC)
   - Tenant isolation enforcement

3. **Microsoft Graph Access:**
   - On-Behalf-Of token exchange
   - Scoped permissions (least privilege)
   - Token caching and refresh

### Data Security

- **Encryption in Transit**: TLS 1.2+ for all communications
- **Encryption at Rest**: Azure-managed encryption
- **Secrets Management**: Azure Key Vault integration
- **Audit Logging**: Comprehensive activity tracking

## Scalability & Performance

### Horizontal Scaling
- Stateless backend design
- Database connection pooling
- Async/await throughout the stack
- Caching strategies for frequently accessed data

### Performance Optimizations
- Database query optimization
- Response caching
- Lazy loading for large datasets
- Efficient dependency calculations (O(1) lookups)

## Observability

### Monitoring Stack
- **Application Insights**: Application performance monitoring
- **Log Analytics**: Centralized logging
- **OpenTelemetry**: Distributed tracing
- **Custom Metrics**: Business KPIs and system health

### Health Checks
- `/health/live` - Basic service availability
- `/health/ready` - Database connectivity and dependencies

## Deployment Architecture

### Customer-Hosted Model
Each customer receives:
- Dedicated Azure Resource Group
- Isolated App Service/Container Apps
- Private PostgreSQL instance
- Separate Key Vault
- Independent monitoring

### Infrastructure Components
- **Compute**: Azure App Service or Container Apps
- **Database**: PostgreSQL Flexible Server
- **Storage**: Azure Storage (files and backups)
- **Networking**: Virtual Network with Private Endpoints
- **Security**: Key Vault, Managed Identity
- **Monitoring**: Application Insights, Log Analytics

## Microsoft Copilot Integration

### Data Indexing (Graph Connectors)
```json
{
  "externalItem": {
    "id": "business-object-123",
    "content": "Object description and metadata",
    "properties": {
      "title": "Object Name",
      "objectType": "workflow",
      "complexity": "high"
    },
    "acl": [
      {"type": "user", "value": "user@tenant.com", "accessType": "grant"}
    ]
  }
}
```

### API Actions (OpenAPI Plugins)
- List business objects
- Get object details
- Perform AI analysis
- Generate optimization recommendations

### Message Extensions
- Teams integration for guided workflows
- Adaptive Cards for rich interactions
- Deep linking back to the application

## Development Principles

### Code Organization
- **Separation of Concerns**: Clear layer boundaries
- **Dependency Injection**: Testable and maintainable code
- **Async First**: Non-blocking operations throughout
- **Type Safety**: Full TypeScript/Python typing

### Testing Strategy
- **Unit Tests**: Individual component testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Complete user workflow testing
- **Contract Tests**: API schema validation

### CI/CD Pipeline
1. **Build**: Container image creation
2. **Test**: Automated test execution
3. **Infrastructure**: Terraform deployment
4. **Database**: Migration execution
5. **Application**: Service deployment
6. **Validation**: Smoke test execution

This architecture ensures scalability, security, and maintainability while providing deep Microsoft 365 integration and AI-powered capabilities for each customer's unique requirements.
