variable "key_vault_name" {
  description = "Name of the Key Vault"
  type        = string
}

variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
}

variable "location" {
  description = "Azure region"
  type        = string
}

variable "sku_name" {
  description = "SKU name for Key Vault"
  type        = string
  default     = "standard"
}

variable "purge_protection_enabled" {
  description = "Enable purge protection"
  type        = bool
  default     = false
}

variable "app_service_principal_id" {
  description = "Principal ID of the App Service managed identity"
  type        = string
  default     = null
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}
