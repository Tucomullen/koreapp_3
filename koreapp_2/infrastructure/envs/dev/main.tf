terraform {
  required_version = ">= 1.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
  }
}

provider "azurerm" {
  features {
    key_vault {
      purge_soft_delete_on_destroy    = true
      recover_soft_deleted_key_vaults = true
    }
  }
}

locals {
  environment = "dev"
  client_name = var.client_name
  
  common_tags = {
    Environment = local.environment
    Client      = local.client_name
    Project     = "ai-agent-platform"
    ManagedBy   = "terraform"
  }
}

module "resource_group" {
  source = "../../modules/resource_group"
  
  resource_group_name = "rg-${local.client_name}-${local.environment}-app"
  location           = var.location
  tags               = local.common_tags
}

module "app_insights" {
  source = "../../modules/app_insights"
  
  app_insights_name   = "ai-${local.client_name}-${local.environment}"
  resource_group_name = module.resource_group.resource_group_name
  location           = var.location
  tags               = local.common_tags
}

module "key_vault" {
  source = "../../modules/key_vault"
  
  key_vault_name      = "kv-${local.client_name}-${local.environment}"
  resource_group_name = module.resource_group.resource_group_name
  location           = var.location
  tags               = local.common_tags
}

module "postgres" {
  source = "../../modules/postgres_flexible"
  
  server_name         = "psql-${local.client_name}-${local.environment}"
  resource_group_name = module.resource_group.resource_group_name
  location           = var.location
  admin_password     = var.postgres_admin_password
  tags               = local.common_tags
}

module "app_service" {
  source = "../../modules/app_service"
  
  app_name            = "app-${local.client_name}-${local.environment}"
  resource_group_name = module.resource_group.resource_group_name
  location           = var.location
  sku_name           = "B1"
  
  app_settings = {
    "DATABASE_URL"                    = module.postgres.connection_string
    "AZURE_TENANT_ID"                = var.azure_tenant_id
    "AZURE_CLIENT_ID"                = var.azure_client_id
    "AZURE_CLIENT_SECRET"            = var.azure_client_secret
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = module.app_insights.connection_string
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE"   = "false"
  }
  
  tags = local.common_tags
}

module "key_vault_access" {
  source = "../../modules/key_vault"
  
  key_vault_name            = module.key_vault.key_vault_name
  resource_group_name       = module.resource_group.resource_group_name
  location                 = var.location
  app_service_principal_id = module.app_service.principal_id
  tags                     = local.common_tags
}
