import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900">CodeAI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-600 hover:text-violet-600 font-medium transition">Home</a>
              <a href="#features" className="text-gray-600 hover:text-violet-600 font-medium transition">Features</a>
              <a href="#categories" className="text-gray-600 hover:text-violet-600 font-medium transition">Categories</a>
              <a href="#testimonials" className="text-gray-600 hover:text-violet-600 font-medium transition">Reviews</a>
              <Link to="/dashboard" className="text-gray-600 hover:text-violet-600 font-medium transition">Dashboard</Link>
            </div>

            <div className="flex items-center space-x-4">
              <button className="hidden md:block text-gray-600 hover:text-violet-600 font-medium transition">
                Sign In
              </button>
              <button className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-violet-600 hover:to-purple-700 transition shadow-lg">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
