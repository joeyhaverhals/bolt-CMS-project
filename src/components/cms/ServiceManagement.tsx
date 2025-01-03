import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function ServiceManagement({ supabase }) {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchServices = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('title', { ascending: true })
      
      if (error) throw error
      setServices(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      fetchServices()
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Service Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(service => (
          <div key={service.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-gray-600 mt-2">{service.description}</p>
                <div className="mt-2">
                  <span className="text-sm text-gray-500">Pricing:</span>
                  <pre className="text-sm bg-gray-100 p-2 rounded mt-1">
                    {JSON.stringify(service.pricing, null, 2)}
                  </pre>
                </div>
              </div>
              <button
                onClick={() => handleDelete(service.id)}
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
