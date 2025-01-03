import React from 'react'

export default function ApiDocumentation() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">API Documentation</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Authentication</h2>
        <div className="prose">
          <p>All API requests must be authenticated using an API key:</p>
          <pre className="bg-gray-100 p-4 rounded">
            {`Authorization: Bearer YOUR_API_KEY`}
          </pre>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Endpoints</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold">GET /api/content</h3>
            <p>Retrieve all content items</p>
          </div>
          <div>
            <h3 className="font-bold">POST /api/content</h3>
            <p>Create new content</p>
          </div>
          <div>
            <h3 className="font-bold">GET /api/content/{'{id}'}</h3>
            <p>Retrieve specific content item</p>
          </div>
        </div>
      </div>
    </div>
  )
}
