import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function FaqManagement({ supabase }) {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchFaqs = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('category', { ascending: true })
      
      if (error) throw error
      setFaqs(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      fetchFaqs()
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchFaqs()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">FAQ Management</h2>
      <div className="space-y-4">
        {faqs.map(faq => (
          <div key={faq.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="text-gray-600 mt-2">{faq.answer}</p>
                <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm mt-2">
                  {faq.category}
                </span>
              </div>
              <button
                onClick={() => handleDelete(faq.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
