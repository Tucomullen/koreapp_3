import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Card from '../components/Card'
import SectionTitle from '../components/SectionTitle'
import { ArrowLeft, Save } from 'lucide-react'

export default function ObjectFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [formData, setFormData] = useState({
    name: isEditing ? 'SAP_ORDER_PROCESS_001' : '',
    type: isEditing ? 'Workflow' : '',
    description: isEditing ? 'Main order processing workflow with approval stages' : '',
    status: isEditing ? 'active' : 'pending',
    complexity: isEditing ? 'high' : 'low',
    owner: isEditing ? 'John Smith' : '',
    tags: isEditing ? 'sap, workflow, orders' : ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/objects')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/objects" className="text-slate-400 hover:text-slate-100">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <SectionTitle>{isEditing ? 'Edit Object' : 'Create New Object'}</SectionTitle>
          <p className="text-slate-400">
            {isEditing ? 'Update object information' : 'Add a new business object to your system'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card title="Basic Information">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Object Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder="Enter object name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-slate-300 mb-2">
                      Type *
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="input w-full"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="Workflow">Workflow</option>
                      <option value="Data Object">Data Object</option>
                      <option value="Process">Process</option>
                      <option value="Integration">Integration</option>
                      <option value="Report">Report</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-slate-300 mb-2">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="input w-full"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="input w-full resize-none"
                    placeholder="Describe the object's purpose and functionality"
                  />
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-slate-300 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder="Enter tags separated by commas"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    Use tags to categorize and make objects easier to find
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card title="Properties">
              <div className="space-y-4">
                <div>
                  <label htmlFor="complexity" className="block text-sm font-medium text-slate-300 mb-2">
                    Complexity Level
                  </label>
                  <select
                    id="complexity"
                    name="complexity"
                    value={formData.complexity}
                    onChange={handleChange}
                    className="input w-full"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="owner" className="block text-sm font-medium text-slate-300 mb-2">
                    Owner
                  </label>
                  <input
                    type="text"
                    id="owner"
                    name="owner"
                    value={formData.owner}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder="Object owner"
                  />
                </div>
              </div>
            </Card>

            <div className="flex space-x-3">
              <button type="submit" className="btn-primary flex-1">
                <Save className="h-4 w-4 mr-2" />
                {isEditing ? 'Update Object' : 'Create Object'}
              </button>
              <Link to="/objects" className="btn-secondary">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
