import React from 'react'
import { Star } from 'lucide-react'

interface ServicesSectionProps {
  servicesRef: React.RefObject<HTMLElement>
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ servicesRef }) => (
  <section ref={servicesRef} className="h-screen bg-[url('https://images.unsplash.com/photo-1522071901873-411886a10004?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=80')] bg-cover bg-center flex items-center relative">
    <div className="absolute inset-0 bg-black/50"></div>
    <div className="relative z-10 max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-16">Our Coaching Programs</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: 'Personal Growth',
            description: 'Unlock your full potential and achieve personal breakthroughs',
            icon: <Star className="w-12 h-12 mb-4 text-orange-500" />
          },
          {
            title: 'Career Advancement',
            description: 'Strategies for career growth and professional development',
            icon: <Star className="w-12 h-12 mb-4 text-orange-500" />
          },
          {
            title: 'Leadership Skills',
            description: 'Develop essential leadership qualities and management skills',
            icon: <Star className="w-12 h-12 mb-4 text-orange-500" />
          }
        ].map((service, index) => (
          <div 
            key={index}
            className="glass-box p-8 rounded-xl backdrop-blur-lg bg-white/10 border border-white/10 hover:scale-105 transition-all cursor-pointer"
          >
            {service.icon}
            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
            <p className="text-gray-300">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)
