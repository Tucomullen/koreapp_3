import { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import SectionTitle from '../components/SectionTitle'
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react'

interface BusinessObject {
  id: string
  name: string
  type: string
  description: string
  status: 'active' | 'inactive' | 'pending'
  lastModified: string
  complexity: 'low' | 'medium' | 'high'
}

const mockObjects: BusinessObject[] = [
  {
    id: '1',
    name: 'SAP_ORDER_PROCESS_001',
    type: 'Workflow',
    description: 'Main order processing workflow with approval stages',
    status: 'active',
    lastModified: '2024-08-15',
    complexity: 'high'
  },
  {
    id: '2',
    name: 'CUSTOMER_MASTER_DATA',
    type: 'Data Object',
    description: 'Customer master data management object',
    status: 'active',
    lastModified: '2024-08-14',
    complexity: 'medium'
  },
  {
    id: '3',
    name: 'INVOICE_GENERATION',
    type: 'Process',
    description: 'Automated invoice generation process',
    status: 'pending',
    lastModified: '2024-08-13',
    complexity: 'low'
  },
  {
    id: '4',
    name: 'INVENTORY_SYNC',
    type: 'Integration',
    description: 'Real-time inventory synchronization',
    status: 'active',
    lastModified: '2024-08-12',
    complexity: 'high'
  }
]

export default function ObjectListPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const filteredObjects = mockObjects.filter(obj => {
    const matchesSearch = obj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         obj.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || obj.status === statusFilter
    const matchesType = typeFilter === 'all' || obj.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600'
      case 'inactive': return 'bg-red-600'
      case 'pending': return 'bg-yellow-600'
      default: return 'bg-slate-600'
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'high': return 'text-red-400'
      default: return 'text-slate-400'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <SectionTitle>Business Objects</SectionTitle>
          <p className="text-slate-400">Manage and monitor your business objects</p>
        </div>
        <Link to="/objects/new" className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          New Object
        </Link>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search objects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="input"
          >
            <option value="all">All Types</option>
            <option value="Workflow">Workflow</option>
            <option value="Data Object">Data Object</option>
            <option value="Process">Process</option>
            <option value="Integration">Integration</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 font-medium text-slate-300">Name</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Type</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Status</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Complexity</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Last Modified</th>
                <th className="text-left py-3 px-4 font-medium text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredObjects.map((obj) => (
                <tr key={obj.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-slate-100">{obj.name}</div>
                      <div className="text-sm text-slate-400">{obj.description}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-sm">
                      {obj.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-white text-sm ${getStatusColor(obj.status)}`}>
                      {obj.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${getComplexityColor(obj.complexity)}`}>
                      {obj.complexity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {obj.lastModified}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Link
                        to={`/objects/${obj.id}`}
                        className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        to={`/objects/${obj.id}/edit`}
                        className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredObjects.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-400">No objects found matching your criteria.</p>
          </div>
        )}
      </Card>
    </div>
  )
}
