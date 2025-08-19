import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import Card from '../components/Card'
import SectionTitle from '../components/SectionTitle'
import { TrendingUp, DollarSign, Clock, Target } from 'lucide-react'

const kpiData = [
  { name: 'Process Efficiency', value: 87, target: 90, icon: Target },
  { name: 'Cost Savings', value: 125000, target: 100000, icon: DollarSign },
  { name: 'Time Reduction', value: 23, target: 20, icon: Clock },
  { name: 'ROI Improvement', value: 34, target: 25, icon: TrendingUp },
]

const trendData = [
  { month: 'Jan', efficiency: 78, savings: 85000, roi: 18 },
  { month: 'Feb', efficiency: 82, savings: 92000, roi: 22 },
  { month: 'Mar', efficiency: 85, savings: 108000, roi: 28 },
  { month: 'Apr', efficiency: 87, savings: 125000, roi: 34 },
  { month: 'May', efficiency: 89, savings: 142000, roi: 38 },
  { month: 'Jun', efficiency: 87, savings: 125000, roi: 34 },
]

const impactData = [
  { name: 'Automation', value: 45, color: '#06b6d4' },
  { name: 'Optimization', value: 30, color: '#0891b2' },
  { name: 'Integration', value: 15, color: '#0e7490' },
  { name: 'Analytics', value: 10, color: '#155e75' },
]

export default function StrategicMetricsPage() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const formatPercentage = (value: number) => `${value}%`

  return (
    <div className="space-y-6">
      <div>
        <SectionTitle>Strategic Metrics</SectionTitle>
        <p className="text-slate-400">Track business value and strategic KPIs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon
          const isTarget = kpi.name === 'Cost Savings' ? kpi.value >= kpi.target : kpi.value >= kpi.target
          const displayValue = kpi.name === 'Cost Savings' ? formatCurrency(kpi.value) : 
                              kpi.name.includes('Reduction') || kpi.name.includes('ROI') || kpi.name.includes('Efficiency') ? 
                              formatPercentage(kpi.value) : kpi.value

          return (
            <Card key={kpi.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-cyan-600 rounded-lg">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className={`text-sm px-2 py-1 rounded ${isTarget ? 'bg-green-600' : 'bg-yellow-600'} text-white`}>
                  {isTarget ? 'On Target' : 'Below Target'}
                </div>
              </div>
              <h3 className="text-sm text-slate-400 mb-1">{kpi.name}</h3>
              <p className="text-2xl font-bold text-slate-100 mb-1">{displayValue}</p>
              <p className="text-xs text-slate-400">
                Target: {kpi.name === 'Cost Savings' ? formatCurrency(kpi.target) : formatPercentage(kpi.target)}
              </p>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Efficiency Trends">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => [
                  name === 'savings' ? formatCurrency(value as number) : `${value}%`,
                  name === 'efficiency' ? 'Efficiency' : name === 'savings' ? 'Savings' : 'ROI'
                ]}
              />
              <Line type="monotone" dataKey="efficiency" stroke="#06b6d4" strokeWidth={2} />
              <Line type="monotone" dataKey="roi" stroke="#0891b2" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Value Impact Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={impactData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {impactData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`${value}%`, 'Impact']}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Cost Savings Over Time">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [formatCurrency(value as number), 'Savings']}
                />
                <Bar dataKey="savings" fill="#06b6d4" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card title="Key Achievements">
          <div className="space-y-4">
            <div className="p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
              <h4 className="font-medium text-green-400 mb-1">Process Automation</h4>
              <p className="text-sm text-slate-300">Automated 15 manual processes, saving 40 hours/week</p>
            </div>
            
            <div className="p-4 bg-cyan-600/20 border border-cyan-600/30 rounded-lg">
              <h4 className="font-medium text-cyan-400 mb-1">Cost Optimization</h4>
              <p className="text-sm text-slate-300">Reduced operational costs by $125K this quarter</p>
            </div>
            
            <div className="p-4 bg-yellow-600/20 border border-yellow-600/30 rounded-lg">
              <h4 className="font-medium text-yellow-400 mb-1">Performance Boost</h4>
              <p className="text-sm text-slate-300">Improved system performance by 34% through AI optimization</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
