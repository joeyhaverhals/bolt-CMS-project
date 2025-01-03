import React, { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import BlogManagement from './components/cms/BlogManagement'
import TestimonialManagement from './components/cms/TestimonialManagement'
import FaqManagement from './components/cms/FaqManagement'
import ServiceManagement from './components/cms/ServiceManagement'
import Auth from './components/cms/Auth'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function CMS() {
  const [session, setSession] = useState(null)

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/cms" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
              </div>
              <Auth session={session} setSession={setSession} />
            </div>
          </div>
        </nav>

        <main className="py-10">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Routes>
              <Route path="/cms/blogs" element={<BlogManagement supabase={supabase} />} />
              <Route path="/cms/testimonials" element={<TestimonialManagement supabase={supabase} />} />
              <Route path="/cms/faqs" element={<FaqManagement supabase={supabase} />} />
              <Route path="/cms/services" element={<ServiceManagement supabase={supabase} />} />
              <Route path="/cms" element={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link to="/cms/blogs" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-medium">Blogs</h3>
                    <p className="text-gray-500">Manage blog posts</p>
                  </Link>
                  <Link to="/cms/testimonials" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-medium">Testimonials</h3>
                    <p className="text-gray-500">Manage client testimonials</p>
                  </Link>
                  <Link to="/cms/faqs" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-medium">FAQs</h3>
                    <p className="text-gray-500">Manage frequently asked questions</p>
                  </Link>
                  <Link to="/cms/services" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-medium">Services</h3>
                    <p className="text-gray-500">Manage coaching services</p>
                  </Link>
                </div>
              } />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}
