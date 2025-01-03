import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { Bar } from 'react-chartjs-2'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalContent: 0,
    publishedContent: 0,
    scheduledContent: 0,
    draftContent: 0
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        const { data: contentData, error: contentError } = await supabase
          .from('content_overview')
          .select('*')
        
        if (contentError) throw contentError

        setStats({
          totalContent: contentData.length,
          publishedContent: contentData.filter(c => c.status === 'published').length,
          scheduledContent: contentData.filter(c => c.status === 'scheduled').length,
          draftContent: contentData.filter(c => c.status === 'draft').length
        })
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const chartData = {
    labels: ['Total', 'Published', 'Scheduled', 'Draft'],
    datasets: [
      {
        label: 'Content Overview',
        data: [
          stats.totalContent,
          stats.publishedContent,
          stats.scheduledContent,
          stats.draftContent
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      {loading && <div>Loading dashboard...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Content</h3>
          <p className="text-3xl font-bold">{stats.totalContent}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Published</h3>
          <p className="text-3xl font-bold">{stats.publishedContent}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Scheduled</h3>
          <p className="text-3xl font-bold">{stats.scheduledContent}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Drafts</h3>
          <p className="text-3xl font-bold">{stats.draftContent}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Content Overview</h2>
        <Bar 
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
