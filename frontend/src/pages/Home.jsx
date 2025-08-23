import React from "react";

// Ideally, set your base font in Tailwind config or index.css as:
// font-family: 'Inter', 'IBM Plex Sans', 'Segoe UI', 'Arial', sans-serif;

const categories = [
  {
    key: "ai",
    title: "Artificial Intelligence",
    desc: "Logic, search, and problem-solving challenges.",
    link: "/problems/ai",
    icon: "🤖",
  },
  {
    key: "ml",
    title: "Machine Learning",
    desc: "Regression, classification, and clustering.",
    link: "/problems/ml",
    icon: "📊",
  },
  {
    key: "deep",
    title: "Deep Learning",
    desc: "CNNs, RNNs, and modern architectures.",
    link: "/problems/deep-learning",
    icon: "🧠",
  },
  {
    key: "genai",
    title: "Generative AI",
    desc: "LLMs, GANs, and creative models.",
    link: "/problems/gen-ai",
    icon: "✨",
  },
];

const questions = [
  { title: "Implement a Perceptron classifier", level: "Easy", domain: "ML" },
  { title: "Text summarization with Transformers", level: "Medium", domain: "Gen AI" },
  { title: "Vision classification with CNNs", level: "Hard", domain: "Deep Learning" },
  { title: "AI: Minimax for turn-based game", level: "Medium", domain: "AI" },
];

const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 text-gray-100 font-sans">
    {/* Navbar */}
  <header className="bg-gray-950/90 border-b border-gray-800 sticky top-0 z-40 shadow-lg backdrop-blur">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/mylogo.png" alt="CodeAI Logo" className="h-8 w-8 rounded-full border border-blue-900 shadow" />
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-300 font-sans">CodeAI</h1>
        </div>
        <nav className="flex space-x-8 text-base font-semibold">
          <a href="/dashboard" className="hover:text-blue-300 focus:outline focus:ring-2 focus:ring-blue-900">Dashboard</a>
          <a href="/problems" className="hover:text-blue-300 focus:outline focus:ring-2 focus:ring-blue-900">Problems</a>
          <a href="/discussions" className="hover:text-blue-300 focus:outline focus:ring-2 focus:ring-blue-900">Discussions</a>
          <a href="/profile" className="hover:text-blue-300 focus:outline focus:ring-2 focus:ring-blue-900">Profile</a>
        </nav>
      </div>
    </header>

    {/* Hero Section */}
    <section className="py-20 px-4 bg-gray-950/80 border-b border-gray-800 shadow-xl">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-extrabold text-blue-300 mb-6 font-sans drop-shadow-lg">
          Elevate Your AI & ML Coding
        </h2>
        <p className="max-w-2xl mx-auto text-lg md:text-xl mb-10 text-gray-300">
          Solve real-world problems in Artificial Intelligence, Machine Learning, Deep Learning, and Generative AI.  
        </p>
        <a
          href="/problems"
          className="inline-block px-10 py-4 text-lg font-bold rounded-lg bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 transition text-white shadow-lg focus:outline focus:ring-2 focus:ring-blue-900"
        >
          Start Solving
        </a>
      </div>
    </section>

    {/* Features Section */}
    <section className="container mx-auto px-4 py-12">
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-md text-center">
          <div className="text-3xl mb-3">🚀</div>
          <h4 className="text-lg font-bold mb-2 text-blue-300">Real Coding Challenges</h4>
          <p className="text-gray-300 text-sm">Practice with hands-on problems from AI, ML, Deep Learning, and Generative AI domains.</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-md text-center">
          <div className="text-3xl mb-3">🧑‍💻</div>
          <h4 className="text-lg font-bold mb-2 text-blue-300">Integrated IDE</h4>
          <p className="text-gray-300 text-sm">Write, run, and test your code directly in the browser with Monaco Editor.</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-md text-center">
          <div className="text-3xl mb-3">🌐</div>
          <h4 className="text-lg font-bold mb-2 text-blue-300">Community & Feedback</h4>
          <p className="text-gray-300 text-sm">Discuss solutions, get hints, and share feedback with a vibrant community.</p>
        </div>
      </div>
    </section>

    {/* Categories */}
    <section className="container mx-auto px-4 py-12">
      <h3 className="text-2xl md:text-3xl font-extrabold mb-8 text-gray-100 tracking-tight">Categories</h3>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <a
            key={cat.key}
            href={cat.link}
            className="block bg-gray-950/80 hover:bg-gray-900 border border-gray-800 rounded-xl p-7 transition shadow-lg group focus:outline focus:ring-2 focus:ring-blue-900"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <div className="text-lg font-bold text-blue-300">{cat.title}</div>
            </div>
            <div className="text-gray-300 text-sm">{cat.desc}</div>
          </a>
        ))}
      </div>
    </section>

    {/* Questions Feed */}
    <section className="container mx-auto px-4 pb-16">
      <h3 className="text-2xl md:text-3xl font-extrabold mb-8 text-gray-100 tracking-tight">Recent Questions</h3>
      <div className="divide-y divide-gray-800 rounded-xl bg-gray-950/80 border border-gray-800 shadow-lg">
        {questions.map((q, i) => (
          <div key={i} className="flex items-center justify-between px-8 py-5 hover:bg-gray-900 transition">
            <div>
              <div className="font-semibold text-gray-100 text-lg">{q.title}</div>
              <div className="text-xs text-gray-400 mt-1">{q.domain} &bull; {q.level}</div>
            </div>
            <a
              href={`/problems/${i}`}
              className="ml-8 py-2 px-6 rounded-lg font-bold bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 transition text-white shadow focus:outline focus:ring-2 focus:ring-blue-900"
            >
              Solve
            </a>
          </div>
        ))}
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-gray-950/90 py-8 border-t border-gray-800 text-center text-gray-500 text-xs font-sans shadow-inner">
      <div className="mb-2">Made with <span className="text-blue-300">AI</span> & <span className="text-blue-300">Passion</span></div>
      © {new Date().getFullYear()} CodeAI Platform
    </footer>
  </div>
);

export default HomePage;
