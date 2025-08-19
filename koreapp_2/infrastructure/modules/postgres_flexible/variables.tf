variable "server_name" {
  description = "Name of the PostgreSQL server"
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

variable "postgres_version" {
  description = "PostgreSQL version"
  type        = string
  default     = "14"
}

variable "admin_username" {
  description = "Administrator username"
  type        = string
  default     = "psqladmin"
}

variable "admin_password" {
  description = "Administrator password"
  type        = string
  sensitive   = true
}

variable "database_name" {
  description = "Name of the database"
  type        = string
  default     = "ai_agent_platform"
}

variable "sku_name" {
  description = "SKU name for the server"
  type        = string
  default     = "B_Standard_B1ms"
}

variable "storage_mb" {
  description = "Storage size in MB"
  type        = number
  default     = 32768
}

variable "availability_zone" {
  description = "Availability zone"
  type        = string
  default     = "1"
}

variable "backup_retention_days" {
  description = "Backup retention in days"
  type        = number
  default     = 7
}

variable "geo_redundant_backup_enabled" {
  description = "Enable geo-redundant backup"
  type        = bool
  default     = false
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}
