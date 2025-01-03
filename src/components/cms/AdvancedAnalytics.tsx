import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { Bar, Line } from 'react-chartjs-2'

export default function AdvancedAnalytics() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('advanced_analytics')
          .select('*')
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
  }, [])

  const engagementData = {
    labels: analytics?.map(a => new Date(a.date).toLocaleDateString()) || [],
    datasets: [
      {
        label: 'Engagement Rate',
        data: analytics?.map(a => a.engagement_rate) || [],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false
      }
    ]
  }

  const contentPerformanceData = {
    labels: analytics?.map(a => a.content_type) || [],
    datasets: [
      {
        label: 'Views',
        data: analytics?.map(a => a.views) || [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Advanced Analytics</h1>
      
      {loading && <div>Loading analytics...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Engagement Over Time</h2>
          <Line 
            data={engagementData}
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
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Content Performance</h2>
          <Bar 
            data={contentPerformanceData}
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
    </div>
  )
}
