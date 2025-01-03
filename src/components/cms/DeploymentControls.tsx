import React, { useState } from 'react'
import { supabase } from '../../supabaseClient'

export default function DeploymentControls() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleDeploy = async (environment) => {
    setLoading(true)
    setSuccess(false)
    try {
      const { error } = await supabase
        .rpc('trigger_deployment', { environment })
      
      if (error) throw error
      setSuccess(true)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Deployment Controls</h1>
      
      {loading && <div>Deploying...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">Deployment initiated successfully!</div>}

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleDeploy('development')}
            disabled={loading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Deploy to Development
          </button>
          <button
            onClick={() => handleDeploy('staging')}
            disabled={loading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
          >
            Deploy to Staging
          </button>
          <button
            onClick={() => handleDeploy('production')}
            disabled={loading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            Deploy to Production
          </button>
        </div>
      </div>
    </div>
  )
}
