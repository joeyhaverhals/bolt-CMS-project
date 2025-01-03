import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { Line } from 'react-chartjs-2'

export default function ContentAnalytics({ contentId, contentType }) {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from(`${contentType}_analytics`)
          .select('*')
          .eq('content_id', contentId)
          .order('date', { ascending: true })
        
        if (error) throw error
        setAnalytics(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [contentId, contentType])

  if (loading) return <div>Loading analytics...</div>
  if (error) return <div>Error: {error}</div>

  const chartData = {
    labels: analytics?.map(a => new Date(a.date).toLocaleDateString()) || [],
    datasets: [
      {
        label: 'Views',
        data: analytics?.map(a => a.views) || [],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false
      },
      {
        label: 'Engagement',
        data: analytics?.map(a => a.engagement) || [],
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false
      }
    ]
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Content Analytics</h3>
      <div className="bg-white p-4 rounded-lg shadow">
        <Line 
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }}
        />
      </div>
    </div>
  )
}
