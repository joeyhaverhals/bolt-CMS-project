import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function ApiIntegration() {
  const [integrations, setIntegrations] = useState([])
  const [newIntegration, setNewIntegration] = useState({
    name: '',
    api_key: '',
    permissions: []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchIntegrations = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('api_integrations')
          .select('*')
        
        if (error) throw error
        setIntegrations(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchIntegrations()
  }, [])

  const handleAddIntegration = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase
        .from('api_integrations')
        .insert([newIntegration])
      
      if (error) throw error
      setNewIntegration({
        name: '',
        api_key: '',
        permissions: []
      })
      fetchIntegrations()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">API Integrations</h1>
      
      {loading && <div>Loading integrations...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleAddIntegration} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Integration Name
            </label>
            <input
              type="text"
              value={newIntegration.name}
              onChange={(e) => setNewIntegration({
                ...newIntegration,
                name: e.target.value
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              API Key
            </label>
            <input
              type="text"
              value={newIntegration.api_key}
              onChange={(e) => setNewIntegration({
                ...newIntegration,
                api_key: e.target.value
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
            {loading ? 'Adding...' : 'Add Integration'}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Existing Integrations</h2>
        <div className="space-y-2">
          {integrations.map(integration => (
            <div key={integration.id} className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <p className="text-gray-900">{integration.name}</p>
                <p className="text-sm text-gray-500">{integration.api_key}</p>
              </div>
              <button
                onClick={() => console.log('Edit integration', integration.id)}
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
