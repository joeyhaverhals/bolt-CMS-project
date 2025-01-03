import React, { useState } from 'react'
import { supabase } from '../../supabaseClient'

export default function ContentImport({ contentType, onImport }) {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleImport = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const content = e.target.result
        let data
        if (file.name.endsWith('.json')) {
          data = JSON.parse(content)
        } else if (file.name.endsWith('.md')) {
          const lines = content.split('\n')
          data = {
            title: lines[0].replace('# ', ''),
            content: lines.slice(2).join('\n')
          }
        } else {
          throw new Error('Unsupported file format')
        }

        const { error } = await supabase
          .from(contentType)
          .insert([data])
        
        if (error) throw error
        onImport()
      }
      reader.readAsText(file)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Import Content</h3>
      <form onSubmit={handleImport} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select File (JSON or Markdown)
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            accept=".json,.md"
            required
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          {loading ? 'Importing...' : 'Import Content'}
        </button>
      </form>
    </div>
  )
}
