import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function ContentStatistics({ contentId, contentType }) {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from(`${contentType}_stats`)
          .select('*')
          .eq('content_id', contentId)
          .single()
        
        if (error) throw error
        setStats(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [contentId, contentType])

  if (loading) return <div>Loading statistics...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Content Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Views</p>
          <p className="text-2xl font-bold">{stats?.views || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Shares</p>
          <p className="text-2xl font-bold">{stats?.shares || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Comments</p>
          <p className="text-2xl font-bold">{stats?.comments || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Engagement</p>
          <p className="text-2xl font-bold">{stats?.engagement || 0}%</p>
        </div>
      </div>
    </div>
  )
}
