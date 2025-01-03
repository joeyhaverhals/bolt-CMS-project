import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function DeploymentSettings() {
  const [settings, setSettings] = useState({
    environment: 'development',
    auto_deploy: false,
    deployment_frequency: 'manual'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('deployment_settings')
          .select('*')
          .single()
        
        if (error) throw error
        if (data) setSettings(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleSaveSettings = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase
        .from('deployment_settings')
        .upsert(settings)
      
      if (error) throw error
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Deployment Settings</h1>
      
      {loading && <div>Loading settings...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Environment
            </label>
            <select
              value={settings.environment}
              onChange={(e) => setSettings({
                ...settings,
                environment: e.target.value
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="development">Development</option>
              <option value="staging">Staging</option>
              <option value="production">Production</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.auto_deploy}
              onChange={(e) => setSettings({
                ...settings,
                auto_deploy: e.target.checked
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Auto Deploy
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deployment Frequency
            </label>
            <select
              value={settings.deployment_frequency}
              onChange={(e) => setSettings({
                ...settings,
                deployment_frequency: e.target.value
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="manual">Manual</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      </div>
    </div>
  )
}
