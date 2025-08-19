terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
  }
}

resource "azurerm_log_analytics_workspace" "main" {
  name                = "${var.app_insights_name}-workspace"
  location            = var.location
  resource_group_name = var.resource_group_name
  sku                 = var.workspace_sku
  retention_in_days   = var.retention_in_days

  tags = var.tags
}

resource "azurerm_application_insights" "main" {
  name                = var.app_insights_name
  location            = var.location
  resource_group_name = var.resource_group_name
  workspace_id        = azurerm_log_analytics_workspace.main.id
  application_type    = var.application_type

  tags = var.tags
}
