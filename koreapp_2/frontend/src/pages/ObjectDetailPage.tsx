import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Card from '../components/Card'
import SectionTitle from '../components/SectionTitle'
import { ArrowLeft, Edit, Bot, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'

export default function ObjectDetailPage() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('overview')

  const mockObject = {
    id: id || '1',
    name: 'SAP_ORDER_PROCESS_001',
    type: 'Workflow',
    description: 'Main order processing workflow with approval stages and automated notifications',
    status: 'active',
    complexity: 'high',
    lastModified: '2024-08-15',
    owner: 'John Smith',
    dependencies: ['CUSTOMER_MASTER_DATA', 'INVENTORY_SYNC', 'PAYMENT_GATEWAY'],
    metrics: {
      executionTime: '2.3s',
      successRate: '98.5%',
      errorRate: '1.5%',
      throughput: '1,247 req/day'
    }
  }

  const aiAnalysis = {
    summary: 'This workflow shows excellent performance with high success rates. However, there are opportunities for optimization in the approval stage.',
    insights: [
      'Approval stage accounts for 60% of total execution time',
      'Peak usage occurs between 9-11 AM, causing occasional bottlenecks',
      'Error rate has decreased by 0.3% compared to last month'
    ],
    recommendations: [
      'Implement parallel approval processing for orders under $1000',
      'Add caching layer for customer data lookups',
      'Consider auto-approval for trusted customers'
    ]
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'dependencies', label: 'Dependencies' },
    { id: 'metrics', label: 'Metrics' },
    { id: 'ai-analysis', label: 'AI Analysis' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/objects" className="text-slate-400 hover:text-slate-100">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <SectionTitle>{mockObject.name}</SectionTitle>
            <p className="text-slate-400">{mockObject.description}</p>
          </div>
        </div>
        <Link to={`/objects/${id}/edit`} className="btn-primary">
          <Edit className="h-4 w-4 mr-2" />
          Edit Object
        </Link>
      </div>

      <div className="border-b border-slate-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card title="Object Information">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400">Type</label>
                  <p className="text-slate-100 font-medium">{mockObject.type}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-400">Status</label>
                  <p className="text-slate-100 font-medium capitalize">{mockObject.status}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-400">Complexity</label>
                  <p className="text-slate-100 font-medium capitalize">{mockObject.complexity}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-400">Owner</label>
                  <p className="text-slate-100 font-medium">{mockObject.owner}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm text-slate-400">Last Modified</label>
                  <p className="text-slate-100 font-medium">{mockObject.lastModified}</p>
                </div>
              </div>
            </Card>
          </div>

          <Card title="Quick Stats">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Success Rate</span>
                <span className="text-green-400 font-medium">{mockObject.metrics.successRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Avg. Execution</span>
                <span className="text-slate-100 font-medium">{mockObject.metrics.executionTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Daily Throughput</span>
                <span className="text-slate-100 font-medium">{mockObject.metrics.throughput}</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'dependencies' && (
        <Card title="Object Dependencies">
          <div className="space-y-4">
            {mockObject.dependencies.map((dep, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-slate-100 font-medium">{dep}</span>
                </div>
                <span className="text-sm text-slate-400">Active</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'metrics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Execution Time</p>
                <p className="text-2xl font-bold text-slate-100">{mockObject.metrics.executionTime}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-cyan-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Success Rate</p>
                <p className="text-2xl font-bold text-green-400">{mockObject.metrics.successRate}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Error Rate</p>
                <p className="text-2xl font-bold text-red-400">{mockObject.metrics.errorRate}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Throughput</p>
                <p className="text-2xl font-bold text-slate-100">{mockObject.metrics.throughput}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-cyan-400" />
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'ai-analysis' && (
        <div className="space-y-6">
          <Card title="AI Analysis Summary">
            <div className="flex items-start space-x-3">
              <Bot className="h-6 w-6 text-cyan-400 mt-1" />
              <p className="text-slate-100">{aiAnalysis.summary}</p>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Key Insights">
              <ul className="space-y-3">
                {aiAnalysis.insights.map((insight, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2" />
                    <span className="text-slate-100">{insight}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card title="Recommendations">
              <ul className="space-y-3">
                {aiAnalysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
                    <span className="text-slate-100">{rec}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
