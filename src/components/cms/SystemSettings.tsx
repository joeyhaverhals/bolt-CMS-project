import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    maintenance_mode: false,
    backup_frequency: 'daily',
    log_retention: 30
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('system_settings')
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
        .from('system_settings')
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
      <h1 className="text-3xl font-bold">System Settings</h1>
      
      {loading && <div>Loading settings...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.maintenance_mode}
              onChange={(e) => setSettings({
                ...settings,
                maintenance_mode: e.target.checked
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Maintenance Mode
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Backup Frequency
            </label>
            <select
              value={settings.backup_frequency}
              onChange={(e) => setSettings({
                ...settings,
                backup_frequency: e.target.value
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Log Retention (days)
            </label>
            <input
              type="number"
              value={settings.log_retention}
              onChange={(e) => setSettings({
                ...settings,
                log_retention: parseInt(e.target.value)
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              min="1"
              max="365"
              required
            />
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
