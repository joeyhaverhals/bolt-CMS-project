import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function PermissionManagement() {
  const [permissions, setPermissions] = useState([])
  const [newPermission, setNewPermission] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPermissions = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('permissions')
          .select('*')
        
        if (error) throw error
        setPermissions(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPermissions()
  }, [])

  const handleAddPermission = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase
        .from('permissions')
        .insert([{ name: newPermission }])
      
      if (error) throw error
      setNewPermission('')
      fetchPermissions()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Permission Management</h1>
      
      {loading && <div>Loading permissions...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleAddPermission} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Permission Name
            </label>
            <input
              type="text"
              value={newPermission}
              onChange={(e) => setNewPermission(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {loading ? 'Adding...' : 'Add Permission'}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Existing Permissions</h2>
        <div className="space-y-2">
          {permissions.map(permission => (
            <div key={permission.id} className="flex justify-between items-center p-4 border rounded-lg">
              <p className="text-gray-900">{permission.name}</p>
              <button
                onClick={() => console.log('Edit permission', permission.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
