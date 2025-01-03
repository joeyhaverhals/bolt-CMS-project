import React from 'react'
import { BookOpen } from 'lucide-react'

interface BlogSectionProps {
  blogRef: React.RefObject<HTMLElement>
}

export const BlogSection: React.FC<BlogSectionProps> = ({ blogRef }) => (
  <section ref={blogRef} className="h-screen bg-[url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=80')] bg-cover bg-center flex items-center relative">
    <div className="absolute inset-0 bg-black/50"></div>
    <div className="relative z-10 max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-16">Latest Articles</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=80',
          'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=80',
          'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=80'
        ].map((imageUrl, index) => (
          <div 
            key={index}
            className="glass-box p-8 rounded-xl backdrop-blur-lg bg-white/10 border border-white/10 hover:scale-105 transition-all cursor-pointer"
          >
            <img 
              src={imageUrl}
              alt="Blog" 
              className="rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">Article Title</h3>
            <p className="text-gray-300">Brief description of the article content...</p>
            <BookOpen className="w-6 h-6 mt-4 text-orange-500" />
          </div>
        ))}
      </div>
    </div>
  </section>
)
