import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function FinalChecks() {
  const [checks, setChecks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchChecks = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('final_checks')
          .select('*')
        
        if (error) throw error
        setChecks(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchChecks()
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Final Checks</h1>
      
      {loading && <div>Loading checks...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          {checks.map(check => (
            <div key={check.id} className="flex items-center p-4 border rounded-lg">
              <div className={`w-4 h-4 rounded-full mr-4 ${
                check.status === 'pass' ? 'bg-green-500' :
                check.status === 'fail' ? 'bg-red-500' :
                'bg-yellow-500'
              }`}></div>
              <div>
                <p className="text-gray-900">{check.name}</p>
                <p className="text-sm text-gray-500">{check.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
