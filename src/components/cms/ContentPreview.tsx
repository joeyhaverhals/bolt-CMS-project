import React from 'react'

export default function ContentPreview({ content }) {
  return (
    <div className="prose max-w-none">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.body }} />
    </div>
  )
}
