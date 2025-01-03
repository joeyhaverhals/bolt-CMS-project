import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function EditTestimonialForm({ testimonialId, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    testimonial_text: '',
    rating: 5
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTestimonial = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('id', testimonialId)
          .single()
        
        if (error) throw error
        setFormData(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonial()
  }, [testimonialId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase
        .from('testimonials')
        .update(formData)
        .eq('id', testimonialId)
      
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
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Testimonial</label>
        <textarea
          value={formData.testimonial_text}
          onChange={(e) => setFormData({...formData, testimonial_text: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows={4}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <select
          value={formData.rating}
          onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          {[1, 2, 3, 4, 5].map(rating => (
            <option key={rating} value={rating}>{rating}</option>
          ))}
        </select>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        {loading ? 'Updating...' : 'Update Testimonial'}
      </button>
    </form>
  )
}
