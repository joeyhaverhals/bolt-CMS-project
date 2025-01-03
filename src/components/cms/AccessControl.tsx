import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function AccessControl() {
  const [accessRules, setAccessRules] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAccessRules = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('access_control')
          .select('*')
        
        if (error) throw error
        setAccessRules(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAccessRules()
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Access Control</h1>
      
      {loading && <div>Loading access rules...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Access Rules</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permission
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accessRules.map(rule => (
                <tr key={rule.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {rule.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {rule.resource}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {rule.permission}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
