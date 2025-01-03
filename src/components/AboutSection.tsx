import React from 'react'

interface AboutSectionProps {
  aboutRef: React.RefObject<HTMLElement>
}

export const AboutSection: React.FC<AboutSectionProps> = ({ aboutRef }) => (
  <section ref={aboutRef} className="h-screen bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=80')] bg-cover bg-center flex items-center relative">
    <div className="absolute inset-0 bg-black/50"></div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
      <div className="glass-box p-8 rounded-xl backdrop-blur-lg bg-white/10 border border-white/10">
        <h2 className="text-4xl font-bold mb-6">About JH Coaching</h2>
        <p className="text-lg leading-relaxed">
          We specialize in personal development, career coaching, and life transformation. Our unique approach combines proven strategies with innovative techniques to help you achieve your goals.
        </p>
      </div>
    </div>
  </section>
)
