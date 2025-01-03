import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function PerformanceOptimization() {
  const [optimizations, setOptimizations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOptimizations = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('performance_optimizations')
          .select('*')
        
        if (error) throw error
        setOptimizations(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchOptimizations()
  }, [])

  const handleApplyOptimization = async (optimizationId) => {
    setLoading(true)
    try {
      const { error } = await supabase
        .rpc('apply_optimization', { optimization_id: optimizationId })
      
      if (error) throw error
      fetchOptimizations()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Performance Optimization</h1>
      
      {loading && <div>Loading optimizations...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          {optimizations.map(optimization => (
            <div key={optimization.id} className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <p className="text-gray-900">{optimization.name}</p>
                <p className="text-sm text-gray-500">{optimization.description}</p>
              </div>
              <button
                onClick={() => handleApplyOptimization(optimization.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
