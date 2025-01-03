import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function ContentCollaboration({ contentId, contentType }) {
  const [collaborators, setCollaborators] = useState([])
  const [newCollaborator, setNewCollaborator] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCollaborators = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from(`${contentType}_collaborators`)
          .select('*')
          .eq('content_id', contentId)
        
        if (error) throw error
        setCollaborators(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCollaborators()
  }, [contentId, contentType])

  const handleAddCollaborator = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase
        .from(`${contentType}_collaborators`)
        .insert({
          content_id: contentId,
          user_email: newCollaborator,
          role: 'editor'
        })
      
      if (error) throw error
      setNewCollaborator('')
      fetchCollaborators()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Collaborators</h3>
      <div className="space-y-2">
        {collaborators.map(collaborator => (
          <div key={collaborator.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">{collaborator.user_email}</p>
                <p className="text-xs text-gray-500">Role: {collaborator.role}</p>
              </div>
              <button
                onClick={() => console.log('Remove collaborator', collaborator.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleAddCollaborator} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Add Collaborator
          </label>
          <input
            type="email"
            value={newCollaborator}
            onChange={(e) => setNewCollaborator(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Enter collaborator's email"
            required
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          {loading ? 'Adding...' : 'Add Collaborator'}
        </button>
      </form>
    </div>
  )
}
