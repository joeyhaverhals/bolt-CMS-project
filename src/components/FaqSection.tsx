import React from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqSectionProps {
  faqRef: React.RefObject<HTMLElement>
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqRef }) => (
  <section ref={faqRef} className="h-screen bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=80')] bg-cover bg-center flex items-center relative">
    <div className="absolute inset-0 bg-black/50"></div>
    <div className="relative z-10 max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {['How does coaching work?', 'What results can I expect?', 'How long are the sessions?'].map((question, index) => (
          <div key={index} className="glass-box p-6 rounded-xl backdrop-blur-lg bg-white/10 border border-white/10">
            <div className="flex items-center justify-between cursor-pointer">
              <h3 className="text-lg font-semibold">{question}</h3>
              <ChevronDown className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)
