import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function UserSettings() {
  const [settings, setSettings] = useState({
    email_notifications: true,
    push_notifications: false,
    dark_mode: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('user_settings')
          .select('*')
          .eq('user_id', supabase.auth.user()?.id)
          .single()
        
        if (error) throw error
        if (data) setSettings(data.settings)
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
        .from('user_settings')
        .upsert({
          user_id: supabase.auth.user()?.id,
          settings: settings
        })
      
      if (error) throw error
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">User Settings</h2>
      <form onSubmit={handleSaveSettings} className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.email_notifications}
            onChange={(e) => setSettings({
              ...settings,
              email_notifications: e.target.checked
            })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Email Notifications
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.push_notifications}
            onChange={(e) => setSettings({
              ...settings,
              push_notifications: e.target.checked
            })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Push Notifications
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.dark_mode}
            onChange={(e) => setSettings({
              ...settings,
              dark_mode: e.target.checked
            })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Dark Mode
          </label>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  )
}
