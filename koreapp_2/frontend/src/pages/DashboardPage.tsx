import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import Card from '../components/Card'
import SectionTitle from '../components/SectionTitle'
import { TrendingUp, Users, Database, AlertTriangle } from 'lucide-react'

const mockMetrics = [
  { name: 'Objects', value: 1247, change: '+12%', icon: Database },
  { name: 'Active Users', value: 89, change: '+5%', icon: Users },
  { name: 'AI Analyses', value: 342, change: '+23%', icon: TrendingUp },
  { name: 'Alerts', value: 7, change: '-15%', icon: AlertTriangle },
]

const mockChartData = [
  { name: 'Jan', objects: 400, analyses: 240 },
  { name: 'Feb', objects: 300, analyses: 139 },
  { name: 'Mar', objects: 200, analyses: 980 },
  { name: 'Apr', objects: 278, analyses: 390 },
  { name: 'May', objects: 189, analyses: 480 },
  { name: 'Jun', objects: 239, analyses: 380 },
]

const mockPieData = [
  { name: 'SAP Objects', value: 45, color: '#06b6d4' },
  { name: 'Integrations', value: 30, color: '#0891b2' },
  { name: 'Workflows', value: 15, color: '#0e7490' },
  { name: 'Reports', value: 10, color: '#155e75' },
]

export default function DashboardPage() {
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: 'AI Analysis completed for SAP_ORDER_001', time: '2 minutes ago', type: 'success' },
    { id: 2, action: 'New object created: CUSTOMER_MASTER_789', time: '15 minutes ago', type: 'info' },
    { id: 3, action: 'Performance optimization suggested', time: '1 hour ago', type: 'warning' },
    { id: 4, action: 'System integration updated', time: '2 hours ago', type: 'info' },
  ])

  return (
    <div className="space-y-6">
      <div>
        <SectionTitle>Dashboard Overview</SectionTitle>
        <p className="text-slate-400">Monitor your AI agent platform performance and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMetrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.name}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{metric.name}</p>
                  <p className="text-2xl font-bold text-slate-100">{metric.value}</p>
                  <p className={`text-sm ${metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {metric.change}
                  </p>
                </div>
                <div className="p-3 bg-cyan-600 rounded-lg">
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Activity Trends">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="objects" stroke="#06b6d4" strokeWidth={2} />
              <Line type="monotone" dataKey="analyses" stroke="#0891b2" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Object Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockPieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {mockPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Performance Analytics">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="objects" fill="#06b6d4" />
                <Bar dataKey="analyses" fill="#0891b2" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card title="Recent Activity">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-400' :
                  activity.type === 'warning' ? 'bg-yellow-400' : 'bg-cyan-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-100">{activity.action}</p>
                  <p className="text-xs text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
