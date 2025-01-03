import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function SystemMaintenance() {
  const [maintenanceTasks, setMaintenanceTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMaintenanceTasks = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('maintenance_tasks')
          .select('*')
          .order('scheduled_at', { ascending: true })
        
        if (error) throw error
        setMaintenanceTasks(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMaintenanceTasks()
  }, [])

  const handleRunTask = async (taskId) => {
    setLoading(true)
    try {
      const { error } = await supabase
        .rpc('run_maintenance_task', { task_id: taskId })
      
      if (error) throw error
      fetchMaintenanceTasks()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">System Maintenance</h1>
      
      {loading && <div>Loading tasks...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Maintenance Tasks</h2>
        <div className="space-y-2">
          {maintenanceTasks.map(task => (
            <div key={task.id} className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <p className="text-gray-900">{task.name}</p>
                <p className="text-sm text-gray-500">
                  Scheduled: {new Date(task.scheduled_at).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleRunTask(task.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                Run Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
