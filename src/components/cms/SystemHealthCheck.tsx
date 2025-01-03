import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function SystemHealthCheck() {
  const [healthStatus, setHealthStatus] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const runHealthCheck = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .rpc('run_health_check')
      
      if (error) throw error
      setHealthStatus(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runHealthCheck()
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">System Health Check</h1>
      
      {loading && <div>Running health check...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Health Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-500">Database</p>
            <p className="text-2xl font-bold">
              {healthStatus.database ? '✅' : '❌'}
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-500">Storage</p>
            <p className="text-2xl font-bold">
              {healthStatus.storage ? '✅' : '❌'}
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-500">Authentication</p>
            <p className="text-2xl font-bold">
              {healthStatus.authentication ? '✅' : '❌'}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={runHealthCheck}
        disabled={loading}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        {loading ? 'Checking...' : 'Run Health Check'}
      </button>
    </div>
  )
}
