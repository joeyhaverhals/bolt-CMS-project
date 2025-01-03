import React from 'react'

interface TestimonialSectionProps {
  testimonialsRef: React.RefObject<HTMLElement>
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({ testimonialsRef }) => (
  <section ref={testimonialsRef} className="h-screen bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=80')] bg-cover bg-center flex items-center relative">
    <div className="absolute inset-0 bg-black/50"></div>
    <div className="relative z-10 max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-16">Client Success Stories</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="glass-box p-8 rounded-xl backdrop-blur-lg bg-white/10 border border-white/10">
            <div className="flex items-center mb-4">
              <img 
                src={`https://i.pravatar.cc/100?img=${index + 10}`} 
                alt="Client" 
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 className="font-bold">Client Name</h4>
                <p className="text-sm text-gray-400">Position</p>
              </div>
            </div>
            <p className="text-gray-300">"The coaching sessions were transformative. I've achieved more in 3 months than I did in 3 years!"</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)
