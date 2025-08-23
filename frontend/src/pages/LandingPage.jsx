import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const CodeWindow = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const codeLines = [
    '# Building a neural network classifier',
    'import numpy as np',
    'from sklearn.neural_network import MLPClassifier',
    '',
    'def train_model(X_train, y_train):',
    '    model = MLPClassifier(',
    '        hidden_layer_sizes=(100, 50),',
    '        activation=\'relu\',',
    '        random_state=42',
    '    )',
    '    return model.fit(X_train, y_train)'
  ];

  React.useEffect(() => {
    if (currentLine >= codeLines.length) return;

    const fullText = codeLines.slice(0, currentLine + 1).join('\n');
    const targetText = fullText;

    if (displayedText.length < targetText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(targetText.slice(0, displayedText.length + 1));
      },60); // Random typing speed between 30-80ms
      
      return () => clearTimeout(timeout);
    } else if (currentLine < codeLines.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 300); // Pause between lines
      
      return () => clearTimeout(timeout);
    }
  }, [displayedText, currentLine, codeLines]);

  // Cursor blinking effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, [displayedText, currentLine, codeLines]);

  const formatCodeLine = (line, index) => {
    if (line.startsWith('#')) {
      return <span className="text-gray-500">{line}</span>;
    } 
    else if (line.startsWith('import') || line.startsWith('from')) {
      const parts = line.split(' ');
      return (
        <span>
          <span className="text-blue-400">{parts[0]} </span>
          {parts.slice(1).map((part, i) => (
            <span key={i} className={part === 'as' || part === 'import' ? 'text-blue-400' : 'text-white'}>
              {i > 0 ? ' ' : ''}{part}
            </span>
          ))}
        </span>
      );
    } 
    else if (line.startsWith('def ')) {
      return (
        <span>
          <span className="text-purple-400">def </span>
          <span className="text-yellow-300">train_model</span>
          <span className="text-white">(X_train, y_train):</span>
        </span>
      );
    } else if (line.includes('MLPClassifier')) {
      return (
        <span className="text-white ml-4">
          model = <span className="text-green-400">MLPClassifier</span>(
        </span>
      );
    } else if (line.includes('hidden_layer_sizes')) {
      return (
        <span className="text-white ml-8">
          hidden_layer_sizes=(<span className="text-orange-400">100, 50</span>),
        </span>
      );
    } else if (line.includes('activation')) {
      return (
        <span className="text-white ml-8">
          activation=<span className="text-green-300">'relu'</span>,
        </span>
      );
    } else if (line.includes('random_state')) {
      return (
        <span className="text-white ml-8">
          random_state=<span className="text-orange-400">42</span>
        </span>
      );
    } else if (line.includes('return')) {
      return <span className="text-white ml-4">return model.fit(X_train, y_train)</span>;
    } else if (line.trim() === ')') {
      return <span className="text-white ml-4">)</span>;
    }
    
    return <span className="text-white">{line}</span>;
  };

  return (
    <div className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
      <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-gray-400 text-sm font-mono">neural_network.py</div>
        <div className="w-16"></div>
      </div>
      <div className="p-6 font-mono text-sm min-h-[300px]">
        {displayedText.split('\n').map((line, index) => (
          <div key={index} className="mb-1">
            {formatCodeLine(line, index)}
            {index === displayedText.split('\n').length - 1 && showCursor && (
              <span className="text-white animate-pulse">|</span>
            )}
          </div>
        ))}
        
        {currentLine >= codeLines.length - 1 && (
          <div className="flex items-center mt-4 pt-4 border-t border-gray-700">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-green-400 text-xs">Ready to execute</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Feature Card
const FeatureCard = ({ icon, title, description, gradient }) => (
  <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
    <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${gradient} shadow-lg mb-6`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-violet-600 transition">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

//  Metric Card
const MetricCard = ({ number, label, suffix = "" }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-gray-900 mb-1">
      {number}{suffix}
    </div>
    <div className="text-gray-600 text-sm font-medium">{label}</div>
  </div>
);

export default function LandingPage({ onSelectCategory }) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { 
      name: "Artificial Intelligence", 
      code: "AI",
      description: "Neural networks, search algorithms, expert systems",
      color: "from-violet-500 to-purple-500",
      questions: 24 
    },
    { 
      name: "Machine Learning", 
      code: "ML", 
      description: "Supervised learning, clustering, feature engineering",
      color: "from-cyan-400 to-blue-500",
      questions: 32 
    },
    { 
      name: "Deep Learning", 
      code: "DL", 
      description: "CNNs, RNNs, transformers, computer vision",
      color: "from-emerald-400 to-green-500",
      questions: 28 
    },
    { 
      name: "Generative AI", 
      code: "GenAI", 
      description: "LLMs, RAG, fine-tuning, prompt engineering",
      color: "from-pink-400 to-rose-500",
      questions: 18 
    }
  ];

  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "AI-Powered Code Reviews",
      description: "Get instant feedback on your code quality, efficiency, and best practices from advanced language models.",
      gradient: "bg-gradient-to-br from-violet-500 to-purple-600"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: "Professional IDE Experience",
      description: "Code in a full-featured Monaco editor with syntax highlighting, autocomplete, and real-time error detection.",
      gradient: "bg-gradient-to-br from-cyan-400 to-blue-500"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Performance Analytics",
      description: "Track your progress with detailed analytics, performance metrics, and personalized learning insights.",
      gradient: "bg-gradient-to-br from-emerald-400 to-green-500"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      ),
      title: "Adaptive Learning Path",
      description: "Personalized question recommendations based on your skill level, progress, and learning objectives.",
      gradient: "bg-gradient-to-br from-pink-400 to-rose-500"
    }
  ];

  const testimonials = [
    {
      name: "Rajeev Kumar",
      role: "DSAI | IIT Bhilai",
      avatar: "image1.png",
      content: "Code is my canvas, builds to make ideas real."
    },
    {
      name: "Aditya Rehpade",
      role: "EE | IIT Bhilai",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbNEGyS86n8xeGzl9O6x6K-vqvuokL0_g97Q&s",
      content: "Finally, a platform that understands the nuances of AI/ML algorithm implementation."
    }
  ];

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <section id="home" className="pt-25 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
                Master AI Coding with 
                <span className="block bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                  Expert Feedback
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-10">
                Practice real-world AI, ML, and Deep Learning problems with instant code reviews, 
                optimization suggestions, and personalized learning paths powered by advanced LLMs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                  onClick={() => document.getElementById('categories').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-violet-600 hover:to-purple-700 transition shadow-lg text-lg"
                >
                  Start Coding Now
                </button>
                <button className="border-2 border-violet-200 text-violet-700 px-8 py-4 rounded-xl font-semibold hover:border-violet-300 hover:bg-violet-50 transition text-lg">
                  Watch Demo
                </button>
              </div>

              <div className="grid grid-cols-3 gap-8">
                <MetricCard number="--" label="Active Learners" />
                <MetricCard number="500+" label="Code Problems" />
                <MetricCard number="--" label="Success Rate" suffix="%" />
              </div>
            </div>
            <div>
              <div className="flex justify-end ">
                <div className="inline-flex items-center bg-violet-50   text-violet-600 px-4 py-2 rounded-full text-sm font-medium mb-8">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI-Powered Learning Platform
                </div>

              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                <CodeWindow />
              </div>

            </div>
            
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built the most advanced AI coding platform with features that adapt to your learning style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master different areas of artificial intelligence with our curated question sets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => onSelectCategory(category.code)}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="flex items-start justify-between mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} shadow-lg`}>
                    <span className="text-white font-bold text-xl">{category.code}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{category.questions}</div>
                    <div className="text-gray-500 text-sm">Problems</div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-violet-600 transition">
                  {category.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {category.description}
                </p>
                
                <div className="flex items-center text-violet-600 font-semibold group-hover:text-violet-700 transition">
                  Start Learning
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of developers who've advanced their careers with our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 px-50">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center mb-5">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                {/* <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-r from-violet-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Level Up Your AI Skills?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Join our community and start practicing with AI-powered feedback today
          </p>
          
          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-white/30"
              required
            />
            <button
              type="submit"
              disabled={isSubmitted}
              className="bg-white text-violet-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition shadow-lg disabled:opacity-50"
            >
              {isSubmitted ? "Sent!" : "Get Started"}
            </button>
          </form>
          
          <p className="text-sm opacity-75">
            Free. No credit card required.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-bold">CodeAI</span>
            </div>
            
            <div className="flex items-center space-x-8">
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Support</a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CodeAI. Built with love for the AI community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
