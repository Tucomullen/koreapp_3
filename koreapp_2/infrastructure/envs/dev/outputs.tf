output "resource_group_name" {
  description = "Name of the resource group"
  value       = module.resource_group.resource_group_name
}

output "app_service_url" {
  description = "URL of the App Service"
  value       = module.app_service.app_service_url
}

output "postgres_server_fqdn" {
  description = "FQDN of the PostgreSQL server"
  value       = module.postgres.server_fqdn
}

output "key_vault_uri" {
  description = "URI of the Key Vault"
  value       = module.key_vault.key_vault_uri
}

output "app_insights_connection_string" {
  description = "Application Insights connection string"
  value       = module.app_insights.connection_string
  sensitive   = true
}
