import React from 'react'
import { MessageCircle } from 'lucide-react'

interface FeaturesSectionProps {
  featuresRef: React.RefObject<HTMLElement>
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ featuresRef }) => (
  <section ref={featuresRef} className="h-screen bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=80')] bg-cover bg-center flex items-center relative">
    <div className="absolute inset-0 bg-black/50"></div>
    <div className="relative z-10 max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-16">Our Services</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {['Career Coaching', 'Life Skills', 'Mindset Training'].map((service, index) => (
          <div 
            key={index}
            className="glass-box p-8 rounded-xl backdrop-blur-lg bg-white/10 border border-white/10 hover:scale-105 transition-all cursor-pointer"
          >
            <MessageCircle className="w-12 h-12 mb-4 text-orange-500" />
            <h3 className="text-2xl font-bold mb-4">{service}</h3>
            <p className="text-gray-300">Comprehensive programs tailored to your unique needs and goals.</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)
