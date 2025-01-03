import React, { useState } from 'react'
import { supabase } from '../../supabaseClient'

export default function WebhookTesting() {
  const [webhookUrl, setWebhookUrl] = useState('')
  const [payload, setPayload] = useState('{}')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleTestWebhook = async () => {
    setLoading(true)
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload
      })
      const data = await res.json()
      setResponse(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Webhook Testing</h1>
      
      {loading && <div>Testing webhook...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Webhook URL
            </label>
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payload
            </label>
            <textarea
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows={6}
              required
            />
          </div>
          <button
            onClick={handleTestWebhook}
            disabled={loading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {loading ? 'Testing...' : 'Test Webhook'}
          </button>
        </div>
      </div>

      {response && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Response</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
