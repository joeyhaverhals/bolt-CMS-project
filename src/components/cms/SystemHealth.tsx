import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { Line } from 'react-chartjs-2'

export default function SystemHealth() {
  const [healthData, setHealthData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHealthData = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('system_health')
          .select('*')
          .order('timestamp', { ascending: true })
        
        if (error) throw error
        setHealthData(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchHealthData()
  }, [])

  const chartData = {
    labels: healthData.map(h => new Date(h.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: healthData.map(h => h.cpu_usage),
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false
      },
      {
        label: 'Memory Usage (%)',
        data: healthData.map(h => h.memory_usage),
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false
      }
    ]
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">System Health</h1>
      
      {loading && <div>Loading health data...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Resource Usage</h2>
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

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Current Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-500">CPU Usage</p>
            <p className="text-2xl font-bold">
              {healthData.length > 0 ? `${healthData[healthData.length - 1].cpu_usage}%` : 'N/A'}
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-500">Memory Usage</p>
            <p className="text-2xl font-bold">
              {healthData.length > 0 ? `${healthData[healthData.length - 1].memory_usage}%` : 'N/A'}
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-500">Active Users</p>
            <p className="text-2xl font-bold">
              {healthData.length > 0 ? healthData[healthData.length - 1].active_users : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
