import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function UserPermissions() {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
        
        if (error) throw error
        setUsers(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleUserSelect = async (userId) => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('user_permissions')
        .select('*')
        .eq('user_id', userId)
      
      if (error) throw error
      setSelectedUser({
        id: userId,
        permissions: data
      })
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">User Permissions</h1>
      
      {loading && <div>Loading permissions...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Select User</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {users.map(user => (
            <div
              key={user.id}
              onClick={() => handleUserSelect(user.id)}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedUser?.id === user.id ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <p className="text-gray-900">{user.email}</p>
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedUser && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">User Permissions</h2>
          <div className="space-y-2">
            {selectedUser.permissions.map(permission => (
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
      )}
    </div>
  )
}
