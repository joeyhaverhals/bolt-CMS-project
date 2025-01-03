import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function ContentNotifications({ contentId, contentType }) {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from(`${contentType}_notifications`)
          .select('*')
          .eq('content_id', contentId)
          .order('created_at', { ascending: false })
        
        if (error) throw error
        setNotifications(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [contentId, contentType])

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Notifications</h3>
      <div className="space-y-2">
        {notifications.map(notification => (
          <div key={notification.id} className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">{notification.message}</p>
            <p className="text-xs text-gray-500">
              {new Date(notification.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
