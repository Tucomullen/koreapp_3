variable "client_name" {
  description = "Name of the client (used in resource naming)"
  type        = string
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "East US"
}

variable "postgres_admin_password" {
  description = "Administrator password for PostgreSQL"
  type        = string
  sensitive   = true
}

variable "azure_tenant_id" {
  description = "Azure tenant ID"
  type        = string
}

variable "azure_client_id" {
  description = "Azure client ID"
  type        = string
}

variable "azure_client_secret" {
  description = "Azure client secret"
  type        = string
  sensitive   = true
}
