import React, { useState } from 'react'
import { supabase } from '../../supabaseClient'

export default function CreateServiceForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'star',
    pricing: {
      basic: 0,
      premium: 0,
      enterprise: 0
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase
        .from('services')
        .insert([formData])
      
      if (error) throw error
      onSuccess()
      setFormData({
        title: '',
        description: '',
        icon: 'star',
        pricing: {
          basic: 0,
          premium: 0,
          enterprise: 0
        }
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
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows={4}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Icon</label>
        <select
          value={formData.icon}
          onChange={(e) => setFormData({...formData, icon: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="star">Star</option>
          <option value="heart">Heart</option>
          <option value="check">Check</option>
          <option value="book">Book</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Pricing</label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500">Basic</label>
            <input
              type="number"
              value={formData.pricing.basic}
              onChange={(e) => setFormData({
                ...formData,
                pricing: {
                  ...formData.pricing,
                  basic: parseFloat(e.target.value)
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Premium</label>
            <input
              type="number"
              value={formData.pricing.premium}
              onChange={(e) => setFormData({
                ...formData,
                pricing: {
                  ...formData.pricing,
                  premium: parseFloat(e.target.value)
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Enterprise</label>
            <input
              type="number"
              value={formData.pricing.enterprise}
              onChange={(e) => setFormData({
                ...formData,
                pricing: {
                  ...formData.pricing,
                  enterprise: parseFloat(e.target.value)
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        {loading ? 'Creating...' : 'Create Service'}
      </button>
    </form>
  )
}
