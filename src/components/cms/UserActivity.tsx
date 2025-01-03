import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { Doughnut } from 'react-chartjs-2'

export default function UserActivity() {
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchActivity = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('user_activity')
          .select('*')
          .order('date', { ascending: false })
        
        if (error) throw error
        setActivity(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchActivity()
  }, [])

  const chartData = {
    labels: activity.map(a => a.user_email),
    datasets: [
      {
        label: 'Content Created',
        data: activity.map(a => a.content_created),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">User Activity</h1>
      
      {loading && <div>Loading activity...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Content Creation by User</h2>
        <Doughnut 
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false
          }}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {activity.slice(0, 5).map(act => (
            <div key={act.id} className="border-b pb-4">
              <p className="text-sm text-gray-600">
                {new Date(act.date).toLocaleDateString()}
              </p>
              <p className="text-gray-800">
                {act.user_email} created {act.content_created} items
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
