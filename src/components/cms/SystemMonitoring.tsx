import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { Line } from 'react-chartjs-2'

export default function SystemMonitoring() {
  const [metrics, setMetrics] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('system_metrics')
          .select('*')
          .order('timestamp', { ascending: true })
        
        if (error) throw error
        setMetrics(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  const chartData = {
    labels: metrics.map(m => new Date(m.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: metrics.map(m => m.cpu_usage),
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false
      },
      {
        label: 'Memory Usage (%)',
        data: metrics.map(m => m.memory_usage),
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false
      }
    ]
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">System Monitoring</h1>
      
      {loading && <div>Loading metrics...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow">
        <Line 
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: 100
              }
            }
          }}
        />
      </div>
    </div>
  )
}
