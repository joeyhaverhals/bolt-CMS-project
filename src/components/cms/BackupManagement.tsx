import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

export default function BackupManagement() {
  const [backups, setBackups] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBackups = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('backups')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) throw error
        setBackups(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBackups()
  }, [])

  const handleCreateBackup = async () => {
    setLoading(true)
    try {
      const { error } = await supabase
        .rpc('create_backup')
      
      if (error) throw error
      fetchBackups()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Backup Management</h1>
      
      {loading && <div>Loading backups...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow">
        <button
          onClick={handleCreateBackup}
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          {loading ? 'Creating...' : 'Create Backup'}
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Existing Backups</h2>
        <div className="space-y-2">
          {backups.map(backup => (
            <div key={backup.id} className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <p className="text-gray-900">
                  Backup from {new Date(backup.created_at).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Size: {backup.size}
                </p>
              </div>
              <button
                onClick={() => console.log('Restore backup', backup.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                Restore
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
