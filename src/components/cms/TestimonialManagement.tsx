import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function TestimonialManagement({ supabase }) {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTestimonials = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('date', { ascending: false })
      
      if (error) throw error
      setTestimonials(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      fetchTestimonials()
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Testimonial Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleDelete(testimonial.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-600 mt-2">{testimonial.testimonial_text}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(testimonial.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
