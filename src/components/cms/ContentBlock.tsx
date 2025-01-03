import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

export default function ContentBlock({ id, index, type, content, moveBlock, updateContent }) {
  const ref = useRef(null)

  const [{ isDragging }, drag] = useDrag({
    type: 'block',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, drop] = useDrop({
    accept: 'block',
    hover(item, monitor) {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      moveBlock(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })

  drag(drop(ref))

  const renderContent = () => {
    switch (type) {
      case 'text':
        return (
          <textarea
            value={content}
            onChange={(e) => updateContent(id, e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
          />
        )
      case 'image':
        return (
          <input
            type="text"
            value={content}
            onChange={(e) => updateContent(id, e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter image URL"
          />
        )
      case 'video':
        return (
          <input
            type="text"
            value={content}
            onChange={(e) => updateContent(id, e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter video URL"
          />
        )
      default:
        return null
    }
  }

  return (
    <div
      ref={ref}
      className={`p-4 border rounded-lg bg-white ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">{type} block</span>
        <button
          onClick={() => console.log('Remove block', id)}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
      {renderContent()}
    </div>
  )
}
