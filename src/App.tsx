import React, { useRef } from 'react'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { FeaturesSection } from './components/FeaturesSection'
import { TestimonialSection } from './components/TestimonialSection'
import { ServicesSection } from './components/ServicesSection'
import { BlogSection } from './components/BlogSection'
import { FaqSection } from './components/FaqSection'
import { ContactSection } from './components/ContactSection'

function App() {
  const aboutRef = useRef(null)
  const featuresRef = useRef(null)
  const testimonialsRef = useRef(null)
  const servicesRef = useRef(null)
  const blogRef = useRef(null)
  const faqRef = useRef(null)
  const contactRef = useRef(null)

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-[#0a0a0a] text-white">
      <HeroSection scrollToSection={scrollToSection} aboutRef={aboutRef} />
      <AboutSection aboutRef={aboutRef} />
      <FeaturesSection featuresRef={featuresRef} />
      <TestimonialSection testimonialsRef={testimonialsRef} />
      <ServicesSection servicesRef={servicesRef} />
      <BlogSection blogRef={blogRef} />
      <FaqSection faqRef={faqRef} />
      <ContactSection contactRef={contactRef} />
    </div>
  )
}

export default App
