import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function ContentWorkflow({ contentId, contentType }) {
  const [workflow, setWorkflow] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWorkflow = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from(`${contentType}_workflow`)
          .select('*')
          .eq('content_id', contentId)
          .order('created_at', { ascending: true })
        
        if (error) throw error
        setWorkflow(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkflow()
  }, [contentId, contentType])

  const handleAddStep = async (step) => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from(`${contentType}_workflow`)
        .insert({
          content_id: contentId,
          step: step,
          status: 'pending'
        })
      
      if (error) throw error
      fetchWorkflow()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Content Workflow</h3>
      <div className="space-y-2">
        {workflow.map(step => (
          <div key={step.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">{step.step}</p>
                <p className="text-xs text-gray-500">Status: {step.status}</p>
              </div>
              <button
                onClick={() => console.log('Update step', step.id)}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => handleAddStep('New Step')}
        disabled={loading}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        {loading ? 'Adding...' : 'Add Workflow Step'}
      </button>
    </div>
  )
}
