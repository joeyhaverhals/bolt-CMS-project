import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { Line } from 'react-chartjs-2'

export default function ContentReports() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('content_reports')
          .select('*')
          .order('date', { ascending: true })
        
        if (error) throw error
        setReports(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  const chartData = {
    labels: reports.map(r => new Date(r.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Content Created',
        data: reports.map(r => r.content_created),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false
      },
      {
        label: 'Content Published',
        data: reports.map(r => r.content_published),
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false
      }
    ]
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Content Reports</h1>
      
      {loading && <div>Loading reports...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Content Activity</h2>
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

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {reports.slice(-5).reverse().map(report => (
            <div key={report.id} className="border-b pb-4">
              <p className="text-sm text-gray-600">
                {new Date(report.date).toLocaleDateString()}
              </p>
              <p className="text-gray-800">
                Created: {report.content_created} | Published: {report.content_published}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
