import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function WebhookManagement() {
  const [webhooks, setWebhooks] = useState([])
  const [newWebhook, setNewWebhook] = useState({
    name: '',
    url: '',
    events: []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWebhooks = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('webhooks')
          .select('*')
        
        if (error) throw error
        setWebhooks(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWebhooks()
  }, [])

  const handleAddWebhook = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase
        .from('webhooks')
        .insert([newWebhook])
      
      if (error) throw error
      setNewWebhook({
        name: '',
        url: '',
        events: []
      })
      fetchWebhooks()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Webhook Management</h1>
      
      {loading && <div>Loading webhooks...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleAddWebhook} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Webhook Name
            </label>
            <input
              type="text"
              value={newWebhook.name}
              onChange={(e) => setNewWebhook({
                ...newWebhook,
                name: e.target.value
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Webhook URL
            </label>
            <input
              type="url"
              value={newWebhook.url}
              onChange={(e) => setNewWebhook({
                ...newWebhook,
                url: e.target.value
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {loading ? 'Adding...' : 'Add Webhook'}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Existing Webhooks</h2>
        <div className="space-y-2">
          {webhooks.map(webhook => (
            <div key={webhook.id} className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <p className="text-gray-900">{webhook.name}</p>
                <p className="text-sm text-gray-500">{webhook.url}</p>
              </div>
              <button
                onClick={() => console.log('Edit webhook', webhook.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
