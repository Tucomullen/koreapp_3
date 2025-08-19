import { useState } from 'react'
import Card from '../components/Card'
import SectionTitle from '../components/SectionTitle'
import { Send, Bot, User, Lightbulb, Search } from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  suggestions?: string[]
}

export default function KnowledgeExplorerPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. I can help you analyze business processes, optimize workflows, and provide insights about your SAP objects. What would you like to explore today?',
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        'Analyze order processing workflow',
        'Find optimization opportunities',
        'Review system dependencies',
        'Generate performance report'
      ]
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you're asking about "${inputMessage}". Based on my analysis of your system, I can provide detailed insights and recommendations. Let me process this information and generate a comprehensive response for you.`,
        sender: 'ai',
        timestamp: new Date(),
        suggestions: [
          'Get more details',
          'Show related objects',
          'Generate action plan',
          'Export analysis'
        ]
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  return (
    <div className="space-y-6">
      <div>
        <SectionTitle>Knowledge Explorer</SectionTitle>
        <p className="text-slate-400">Interact with AI to analyze processes and discover insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <div className="h-96 overflow-y-auto mb-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-cyan-600 text-white' 
                      : 'bg-slate-700 text-slate-100'
                  }`}>
                    <div className="flex items-center mb-1">
                      {message.sender === 'ai' ? (
                        <Bot className="h-4 w-4 mr-2" />
                      ) : (
                        <User className="h-4 w-4 mr-2" />
                      )}
                      <span className="text-xs opacity-75">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                    
                    {message.suggestions && (
                      <div className="mt-3 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="block w-full text-left text-xs px-2 py-1 bg-slate-600 hover:bg-slate-500 rounded text-slate-200 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-700 text-slate-100 px-4 py-2 rounded-lg">
                    <div className="flex items-center">
                      <Bot className="h-4 w-4 mr-2" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about your business processes..."
                className="flex-1 input"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="Quick Actions">
            <div className="space-y-2">
              <button 
                onClick={() => handleSuggestionClick('Analyze my top 10 most complex objects')}
                className="w-full text-left p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <Search className="h-4 w-4 mr-2 text-cyan-400" />
                  <span className="text-sm">Analyze Complex Objects</span>
                </div>
              </button>
              
              <button 
                onClick={() => handleSuggestionClick('Find optimization opportunities in my workflows')}
                className="w-full text-left p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2 text-cyan-400" />
                  <span className="text-sm">Find Optimizations</span>
                </div>
              </button>
              
              <button 
                onClick={() => handleSuggestionClick('Generate a performance report for this month')}
                className="w-full text-left p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <Bot className="h-4 w-4 mr-2 text-cyan-400" />
                  <span className="text-sm">Performance Report</span>
                </div>
              </button>
            </div>
          </Card>

          <Card title="AI Capabilities">
            <div className="space-y-3 text-sm text-slate-300">
              <div>
                <h4 className="font-medium text-slate-100 mb-1">Process Analysis</h4>
                <p className="text-xs">Deep analysis of business workflows and dependencies</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-100 mb-1">Optimization</h4>
                <p className="text-xs">Identify bottlenecks and improvement opportunities</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-100 mb-1">Insights</h4>
                <p className="text-xs">Generate actionable insights from your data</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
