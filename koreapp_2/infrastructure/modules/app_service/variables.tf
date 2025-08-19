variable "app_name" {
  description = "Name of the App Service"
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
  description = "SKU name for the App Service Plan"
  type        = string
  default     = "B1"
}

variable "always_on" {
  description = "Should the app be always on"
  type        = bool
  default     = true
}

variable "docker_image" {
  description = "Docker image name"
  type        = string
  default     = "nginx"
}

variable "docker_image_tag" {
  description = "Docker image tag"
  type        = string
  default     = "latest"
}

variable "app_settings" {
  description = "App settings for the web app"
  type        = map(string)
  default     = {}
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}
