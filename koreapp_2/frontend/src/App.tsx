import { Routes, Route, Navigate } from 'react-router-dom'
import { useIsAuthenticated } from '@azure/msal-react'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import KnowledgeExplorerPage from './pages/KnowledgeExplorerPage'
import ObjectDetailPage from './pages/ObjectDetailPage'
import ObjectListPage from './pages/ObjectListPage'
import ObjectFormPage from './pages/ObjectFormPage'
import StrategicMetricsPage from './pages/StrategicMetricsPage'
import SettingsPage from './pages/SettingsPage'

function App() {
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/knowledge" element={<KnowledgeExplorerPage />} />
        <Route path="/objects" element={<ObjectListPage />} />
        <Route path="/objects/new" element={<ObjectFormPage />} />
        <Route path="/objects/:id" element={<ObjectDetailPage />} />
        <Route path="/objects/:id/edit" element={<ObjectFormPage />} />
        <Route path="/metrics" element={<StrategicMetricsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Layout>
  )
}

export default App
