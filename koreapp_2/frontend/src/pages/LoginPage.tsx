import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../config/authConfig'
import { LogIn } from 'lucide-react'

export default function LoginPage() {
  const { instance } = useMsal()

  const handleLogin = () => {
    instance.loginRedirect(loginRequest)
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-cyan-600 rounded-full flex items-center justify-center mb-6">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-100 mb-2">
            AI Agent Platform
          </h2>
          <p className="text-slate-400 mb-8">
            Sign in with your Microsoft account to continue
          </p>
        </div>
        
        <div className="card">
          <button
            onClick={handleLogin}
            className="w-full btn-primary flex items-center justify-center py-3"
          >
            <LogIn className="mr-2 h-5 w-5" />
            Sign in with Microsoft
          </button>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Secure authentication powered by Microsoft Entra ID
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
