terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
  }
}

data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "main" {
  name                = var.key_vault_name
  location            = var.location
  resource_group_name = var.resource_group_name
  tenant_id           = data.azurerm_client_config.current.tenant_id
  sku_name            = var.sku_name

  enabled_for_disk_encryption     = true
  enabled_for_deployment          = true
  enabled_for_template_deployment = true
  purge_protection_enabled        = var.purge_protection_enabled

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    key_permissions = [
      "Get", "List", "Update", "Create", "Import", "Delete", "Recover", "Backup", "Restore"
    ]

    secret_permissions = [
      "Get", "List", "Set", "Delete", "Recover", "Backup", "Restore"
    ]

    certificate_permissions = [
      "Get", "List", "Update", "Create", "Import", "Delete", "Recover", "Backup", "Restore", "ManageContacts", "ManageIssuers", "GetIssuers", "ListIssuers", "SetIssuers", "DeleteIssuers"
    ]
  }

  tags = var.tags
}

resource "azurerm_key_vault_access_policy" "app_service" {
  count = var.app_service_principal_id != null ? 1 : 0

  key_vault_id = azurerm_key_vault.main.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = var.app_service_principal_id

  secret_permissions = [
    "Get", "List"
  ]
}
