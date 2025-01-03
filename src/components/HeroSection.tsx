import React from 'react'
import { ChevronDown } from 'lucide-react'

interface HeroSectionProps {
  scrollToSection: (ref: React.RefObject<HTMLElement>) => void
  aboutRef: React.RefObject<HTMLElement>
}

export const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection, aboutRef }) => (
  <section className="h-screen bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=80')] bg-cover bg-center flex flex-col justify-center items-center relative">
    <div className="absolute inset-0 bg-black/50"></div>
    <div className="relative z-10 text-center space-y-6">
      <h1 className="text-6xl font-bold">Unlock Your Potential</h1>
      <p className="text-xl">Transform your life with JH Personal Coaching</p>
      <button 
        onClick={() => scrollToSection(aboutRef)}
        className="bg-orange-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-all"
      >
        Explore More <ChevronDown className="inline ml-2" />
      </button>
    </div>
  </section>
)
