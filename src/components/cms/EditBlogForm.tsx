import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function EditBlogForm({ blogId, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    featured_image_url: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', blogId)
          .single()
        
        if (error) throw error
        setFormData(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [blogId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase
        .from('blogs')
        .update(formData)
        .eq('id', blogId)
      
      if (error) throw error
      onSuccess()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows={6}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Author</label>
        <input
          type="text"
          value={formData.author}
          onChange={(e) => setFormData({...formData, author: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Featured Image URL</label>
        <input
          type="url"
          value={formData.featured_image_url}
          onChange={(e) => setFormData({...formData, featured_image_url: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        {loading ? 'Updating...' : 'Update Blog'}
      </button>
    </form>
  )
}
