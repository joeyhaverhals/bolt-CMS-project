import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function ContentComments({ contentId, contentType }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from(`${contentType}_comments`)
          .select('*')
          .eq('content_id', contentId)
          .order('created_at', { ascending: false })
        
        if (error) throw error
        setComments(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [contentId, contentType])

  const handleAddComment = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase
        .from(`${contentType}_comments`)
        .insert({
          content_id: contentId,
          comment: newComment,
          user_id: supabase.auth.user()?.id
        })
      
      if (error) throw error
      setNewComment('')
      fetchComments()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Comments</h3>
      <div className="space-y-2">
        {comments.map(comment => (
          <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">{comment.comment}</p>
            <p className="text-xs text-gray-500">
              By {comment.user_email} on {new Date(comment.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleAddComment} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Add Comment
          </label>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows={3}
            required
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  )
}
