import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function ContentVersioning({ contentId, contentType }) {
  const [versions, setVersions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVersions = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from(`${contentType}_versions`)
          .select('*')
          .eq('content_id', contentId)
          .order('created_at', { ascending: false })
        
        if (error) throw error
        setVersions(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchVersions()
  }, [contentId, contentType])

  const handleRestore = async (versionId) => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from(`${contentType}_versions`)
        .select('*')
        .eq('id', versionId)
        .single()
      
      if (error) throw error

      const { error: updateError } = await supabase
        .from(contentType)
        .update(data.content)
        .eq('id', contentId)
      
      if (updateError) throw updateError
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Content Versions</h3>
      <div className="space-y-2">
        {versions.map(version => (
          <div key={version.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  Version from {new Date(version.created_at).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  Edited by {version.edited_by}
                </p>
              </div>
              <button
                onClick={() => handleRestore(version.id)}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                Restore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
