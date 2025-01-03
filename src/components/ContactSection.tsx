import React from 'react'
import { Mail } from 'lucide-react'

interface ContactSectionProps {
  contactRef: React.RefObject<HTMLElement>
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contactRef }) => (
  <section ref={contactRef} className="h-screen bg-[url('https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=80')] bg-cover bg-center flex items-center relative">
    <div className="absolute inset-0 bg-black/50"></div>
    <div className="relative z-10 max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-16">Get in Touch</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <form className="space-y-6">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="w-full p-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            className="w-full p-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <textarea 
            placeholder="Your Message" 
            rows="5"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
          ></textarea>
          <button 
            type="submit"
            className="bg-orange-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-all"
          >
            Send Message <Mail className="inline ml-2" />
          </button>
        </form>
        <div className="flex items-center justify-center space-x-6">
          {['facebook', 'twitter', 'instagram'].map((platform, index) => (
            <a 
              key={index} 
              href="#" 
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              <img 
                src={`https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${platform}.svg`} 
                alt={platform} 
                className="w-6 h-6"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
)
