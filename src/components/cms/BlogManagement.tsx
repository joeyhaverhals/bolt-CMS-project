import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function BlogManagement({ supabase }) {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('publish_date', { ascending: false })
      
      if (error) throw error
      setBlogs(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blog Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map(blog => (
          <div key={blog.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <p className="text-gray-600">{blog.author}</p>
            <p className="text-sm text-gray-500">{new Date(blog.publish_date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
