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
  <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-neutral-900 to-indigo-900 text-neutral-100 font-sans">
    {/* Navbar */}
    <header className="bg-neutral-950/90 border-b border-neutral-800 sticky top-0 z-40 shadow-lg backdrop-blur">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/mylogo.png" alt="CodeAI Logo" className="h-8 w-8 rounded-full border border-indigo-500 shadow" />
          <h1 className="text-3xl font-extrabold tracking-tight text-indigo-400 font-sans">CodeAI</h1>
        </div>
        <nav className="flex space-x-8 text-base font-semibold">
          <a href="/dashboard" className="hover:text-indigo-400 focus:outline focus:ring-2 focus:ring-indigo-500">Dashboard</a>
          <a href="/problems" className="hover:text-indigo-400 focus:outline focus:ring-2 focus:ring-indigo-500">Problems</a>
          <a href="/discussions" className="hover:text-indigo-400 focus:outline focus:ring-2 focus:ring-indigo-500">Discussions</a>
          <a href="/profile" className="hover:text-indigo-400 focus:outline focus:ring-2 focus:ring-indigo-500">Profile</a>
        </nav>
      </div>
    </header>

    {/* Hero Section */}
    <section className="py-20 px-4 bg-neutral-950/80 border-b border-neutral-800 shadow-xl">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-extrabold text-indigo-400 mb-6 font-sans drop-shadow-lg">
          Elevate Your AI & ML Coding
        </h2>
        <p className="max-w-2xl mx-auto text-lg md:text-xl mb-10 text-neutral-300">
          Solve real-world problems in Artificial Intelligence, Machine Learning, Deep Learning, and Generative AI.  
        </p>
        <a
          href="/problems"
          className="inline-block px-10 py-4 text-lg font-bold rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 transition text-white shadow-lg focus:outline focus:ring-2 focus:ring-indigo-500"
        >
          Start Solving
        </a>
      </div>
    </section>

    {/* Features Section */}
    <section className="container mx-auto px-4 py-12">
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-8 shadow-md text-center">
          <div className="text-3xl mb-3">🚀</div>
          <h4 className="text-lg font-bold mb-2 text-indigo-400">Real Coding Challenges</h4>
          <p className="text-neutral-300 text-sm">Practice with hands-on problems from AI, ML, Deep Learning, and Generative AI domains.</p>
        </div>
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-8 shadow-md text-center">
          <div className="text-3xl mb-3">🧑‍💻</div>
          <h4 className="text-lg font-bold mb-2 text-indigo-400">Integrated IDE</h4>
          <p className="text-neutral-300 text-sm">Write, run, and test your code directly in the browser with Monaco Editor.</p>
        </div>
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-8 shadow-md text-center">
          <div className="text-3xl mb-3">🌐</div>
          <h4 className="text-lg font-bold mb-2 text-indigo-400">Community & Feedback</h4>
          <p className="text-neutral-300 text-sm">Discuss solutions, get hints, and share feedback with a vibrant community.</p>
        </div>
      </div>
    </section>

    {/* Categories */}
    <section className="container mx-auto px-4 py-12">
      <h3 className="text-2xl md:text-3xl font-extrabold mb-8 text-neutral-100 tracking-tight">Categories</h3>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <a
            key={cat.key}
            href={cat.link}
            className="block bg-neutral-900/80 hover:bg-neutral-800 border border-indigo-700 rounded-xl p-7 transition shadow-lg group focus:outline focus:ring-2 focus:ring-indigo-500"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <div className="text-lg font-bold text-indigo-400">{cat.title}</div>
            </div>
            <div className="text-neutral-300 text-sm">{cat.desc}</div>
          </a>
        ))}
      </div>
    </section>

    {/* Questions Feed */}
    <section className="container mx-auto px-4 pb-16">
      <h3 className="text-2xl md:text-3xl font-extrabold mb-8 text-neutral-100 tracking-tight">Recent Questions</h3>
      <div className="divide-y divide-neutral-800 rounded-xl bg-neutral-900/80 border border-indigo-700 shadow-lg">
        {questions.map((q, i) => (
          <div key={i} className="flex items-center justify-between px-8 py-5 hover:bg-neutral-800 transition">
            <div>
              <div className="font-semibold text-neutral-100 text-lg">{q.title}</div>
              <div className="text-xs text-neutral-400 mt-1">{q.domain} &bull; {q.level}</div>
            </div>
            <a
              href={`/problems/${i}`}
              className="ml-8 py-2 px-6 rounded-lg font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 transition text-white shadow focus:outline focus:ring-2 focus:ring-indigo-500"
            >
              Solve
            </a>
          </div>
        ))}
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-neutral-950/90 py-8 border-t border-neutral-800 text-center text-neutral-500 text-xs font-sans shadow-inner">
      <div className="mb-2">Made with <span className="text-indigo-400">AI</span> & <span className="text-indigo-400">Passion</span></div>
      © {new Date().getFullYear()} CodeAI Platform
    </footer>
  </div>
);

export default HomePage;
