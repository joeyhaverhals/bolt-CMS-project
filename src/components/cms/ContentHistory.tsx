import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function ContentHistory({ contentId, contentType }) {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from(`${contentType}_history`)
          .select('*')
          .eq('content_id', contentId)
          .order('created_at', { ascending: false })
        
        if (error) throw error
        setHistory(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [contentId, contentType])

  if (loading) return <div>Loading history...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Revision History</h3>
      <div className="space-y-2">
        {history.map(version => (
          <div key={version.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  Edited by {version.edited_by} on {new Date(version.created_at).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  Changes: {version.changes}
                </p>
              </div>
              <button
                onClick={() => console.log('Restore version', version.id)}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                Restore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
