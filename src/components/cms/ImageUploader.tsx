import React, { useState } from 'react'
import { supabase } from '../../supabaseClient'

export default function ImageUploader({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  const handleUpload = async (e) => {
    try {
      setUploading(true)
      const file = e.target.files[0]
      if (!file) return

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      onUploadSuccess(publicUrl)
    } catch (error) {
      setError(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Upload Image
      </label>
      <input
        type="file"
        onChange={handleUpload}
        disabled={uploading}
        className="mt-1 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  )
}
