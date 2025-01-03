import React, { useState } from 'react'
import { supabase } from '../../supabaseClient'

export default function CreateFaqForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase
        .from('faqs')
        .insert([formData])
      
      if (error) throw error
      onSuccess()
      setFormData({
        question: '',
        answer: '',
        category: 'General'
      })
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Question</label>
        <input
          type="text"
          value={formData.question}
          onChange={(e) => setFormData({...formData, question: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Answer</label>
        <textarea
          value={formData.answer}
          onChange={(e) => setFormData({...formData, answer: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows={4}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="General">General</option>
          <option value="Pricing">Pricing</option>
          <option value="Technical">Technical</option>
          <option value="Account">Account</option>
        </select>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        {loading ? 'Creating...' : 'Create FAQ'}
      </button>
    </form>
  )
}
