variable "app_insights_name" {
  description = "Name of the Application Insights instance"
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

variable "application_type" {
  description = "Type of application"
  type        = string
  default     = "web"
}

variable "workspace_sku" {
  description = "SKU for Log Analytics workspace"
  type        = string
  default     = "PerGB2018"
}

variable "retention_in_days" {
  description = "Retention period in days"
  type        = number
  default     = 30
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}
