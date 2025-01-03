import React, { useState } from 'react'
import { supabase } from '../../supabaseClient'

export default function ContentExport({ contentId, contentType }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleExport = async (format) => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from(contentType)
        .select('*')
        .eq('id', contentId)
        .single()
      
      if (error) throw error

      let content
      switch (format) {
        case 'json':
          content = JSON.stringify(data, null, 2)
          break
        case 'markdown':
          content = `# ${data.title}\n\n${data.content}`
          break
        default:
          throw new Error('Unsupported format')
      }

      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${contentType}_${contentId}.${format}`
      link.click()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Export Content</h3>
      <div className="flex space-x-2">
        <button
          onClick={() => handleExport('json')}
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          {loading ? 'Exporting...' : 'Export as JSON'}
        </button>
        <button
          onClick={() => handleExport('markdown')}
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          {loading ? 'Exporting...' : 'Export as Markdown'}
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  )
}
