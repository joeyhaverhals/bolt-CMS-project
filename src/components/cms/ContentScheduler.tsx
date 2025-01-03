import React, { useState } from 'react'
import { supabase } from '../../supabaseClient'

export default function ContentScheduler({ contentId, contentType, onSchedule }) {
  const [scheduleDate, setScheduleDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSchedule = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase
        .from(`${contentType}_schedules`)
        .upsert({
          content_id: contentId,
          publish_at: scheduleDate
        })
      
      if (error) throw error
      onSchedule()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Schedule Content</h3>
      <form onSubmit={handleSchedule} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Publish Date & Time
          </label>
          <input
            type="datetime-local"
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          {loading ? 'Scheduling...' : 'Schedule Content'}
        </button>
      </form>
    </div>
  )
}
