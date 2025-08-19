import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useMsal } from '@azure/msal-react'
import { 
  LayoutDashboard, 
  Search, 
  Package, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

interface LayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Knowledge Explorer', href: '/knowledge', icon: Search },
  { name: 'Objects', href: '/objects', icon: Package },
  { name: 'Strategic Metrics', href: '/metrics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { instance } = useMsal()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    instance.logoutRedirect()
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="flex">
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700">
            <h1 className="text-xl font-bold text-cyan-400">AI Agent Platform</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-slate-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="mt-8 px-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href || 
                  (item.href === '/objects' && location.pathname.startsWith('/objects'))
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        isActive
                          ? 'bg-cyan-600 text-white'
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors duration-200"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="flex-1 lg:ml-0">
          <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-slate-800 border-b border-slate-700">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-slate-400 hover:text-slate-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-cyan-400">AI Agent Platform</h1>
            <div className="w-6" />
          </div>
          
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
      
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
