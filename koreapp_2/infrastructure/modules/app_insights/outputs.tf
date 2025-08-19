output "app_insights_name" {
  description = "Name of Application Insights"
  value       = azurerm_application_insights.main.name
}

output "app_insights_id" {
  description = "ID of Application Insights"
  value       = azurerm_application_insights.main.id
}

output "instrumentation_key" {
  description = "Instrumentation key"
  value       = azurerm_application_insights.main.instrumentation_key
  sensitive   = true
}

output "connection_string" {
  description = "Connection string"
  value       = azurerm_application_insights.main.connection_string
  sensitive   = true
}

output "workspace_id" {
  description = "Log Analytics workspace ID"
  value       = azurerm_log_analytics_workspace.main.id
}
