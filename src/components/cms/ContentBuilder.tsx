import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ContentBlock from './ContentBlock'

export default function ContentBuilder() {
  const [blocks, setBlocks] = useState([])

  const addBlock = (type) => {
    setBlocks([...blocks, { id: Date.now(), type, content: '' }])
  }

  const moveBlock = (fromIndex, toIndex) => {
    const newBlocks = [...blocks]
    const [removed] = newBlocks.splice(fromIndex, 1)
    newBlocks.splice(toIndex, 0, removed)
    setBlocks(newBlocks)
  }

  const updateBlockContent = (id, content) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content } : block
    ))
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Drag & Drop Content Builder</h1>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => addBlock('text')}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Text Block
            </button>
            <button
              onClick={() => addBlock('image')}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Add Image Block
            </button>
            <button
              onClick={() => addBlock('video')}
              className="px-4 py-2 bg-purple-500 text-white rounded"
            >
              Add Video Block
            </button>
          </div>

          <div className="space-y-4">
            {blocks.map((block, index) => (
              <ContentBlock
                key={block.id}
                index={index}
                id={block.id}
                type={block.type}
                content={block.content}
                moveBlock={moveBlock}
                updateContent={updateBlockContent}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  )
}
