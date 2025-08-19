import { useState } from 'react'
import Card from '../components/Card'
import SectionTitle from '../components/SectionTitle'
import { Save, Bell, Shield, Database, Zap } from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      aiInsights: true,
      systemAlerts: true
    },
    ai: {
      autoAnalysis: true,
      suggestionLevel: 'medium',
      learningMode: true
    },
    system: {
      theme: 'dark',
      language: 'en',
      timezone: 'UTC'
    },
    integration: {
      microsoftGraph: true,
      teamsNotifications: false,
      sharePointSync: true
    }
  })

  const handleSave = () => {
    console.log('Settings saved:', settings)
  }

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <SectionTitle>Settings</SectionTitle>
        <p className="text-slate-400">Configure your AI agent platform preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Notifications">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-slate-100 font-medium">Email Notifications</p>
                  <p className="text-sm text-slate-400">Receive updates via email</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) => updateSetting('notifications', 'email', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Zap className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-slate-100 font-medium">AI Insights</p>
                  <p className="text-sm text-slate-400">Get AI-powered recommendations</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.aiInsights}
                  onChange={(e) => updateSetting('notifications', 'aiInsights', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-slate-100 font-medium">System Alerts</p>
                  <p className="text-sm text-slate-400">Critical system notifications</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.systemAlerts}
                  onChange={(e) => updateSetting('notifications', 'systemAlerts', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
              </label>
            </div>
          </div>
        </Card>

        <Card title="AI Configuration">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-100 font-medium">Auto Analysis</p>
                <p className="text-sm text-slate-400">Automatically analyze new objects</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.ai.autoAnalysis}
                  onChange={(e) => updateSetting('ai', 'autoAnalysis', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Suggestion Level
              </label>
              <select
                value={settings.ai.suggestionLevel}
                onChange={(e) => updateSetting('ai', 'suggestionLevel', e.target.value)}
                className="input w-full"
              >
                <option value="low">Conservative</option>
                <option value="medium">Balanced</option>
                <option value="high">Aggressive</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-100 font-medium">Learning Mode</p>
                <p className="text-sm text-slate-400">Allow AI to learn from your patterns</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.ai.learningMode}
                  onChange={(e) => updateSetting('ai', 'learningMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
              </label>
            </div>
          </div>
        </Card>

        <Card title="System Preferences">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Theme
              </label>
              <select
                value={settings.system.theme}
                onChange={(e) => updateSetting('system', 'theme', e.target.value)}
                className="input w-full"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Language
              </label>
              <select
                value={settings.system.language}
                onChange={(e) => updateSetting('system', 'language', e.target.value)}
                className="input w-full"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Timezone
              </label>
              <select
                value={settings.system.timezone}
                onChange={(e) => updateSetting('system', 'timezone', e.target.value)}
                className="input w-full"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
              </select>
            </div>
          </div>
        </Card>

        <Card title="Microsoft 365 Integration">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Database className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-slate-100 font-medium">Microsoft Graph</p>
                  <p className="text-sm text-slate-400">Enable Graph API integration</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.integration.microsoftGraph}
                  onChange={(e) => updateSetting('integration', 'microsoftGraph', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-100 font-medium">SharePoint Sync</p>
                <p className="text-sm text-slate-400">Sync data with SharePoint</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.integration.sharePointSync}
                  onChange={(e) => updateSetting('integration', 'sharePointSync', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
              </label>
            </div>

            <div className="pt-4 border-t border-slate-700">
              <p className="text-sm text-slate-400 mb-2">Connection Status</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-slate-300">Connected to Microsoft 365</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  )
}
