import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

// === Helper: Gradient button classes ===
const primaryBtn =
  "relative inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white transition focus:outline-none focus:ring-4 focus:ring-blue-500/30";
const secondaryBtn =
  "relative inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border border-white/10 text-white/90 transition hover:bg-white/5 focus:outline-none focus:ring-4 focus:ring-cyan-500/20";

const gradientBg = {
  background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
};

// === Code typing showcase ===
function CodeShowcase() {
  const [text, setText] = useState("");
  const [cursor, setCursor] = useState(true);

  const lines = useMemo(
    () => [
      "# Solving: Multi-Class Image Classifier",
      "import numpy as np",
      "from sklearn.model_selection import train_test_split",
      "from sklearn.metrics import accuracy_score",
      "from sklearn.neural_network import MLPClassifier",
      "",
      "X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)",
      "model = MLPClassifier(hidden_layer_sizes=(256,128), activation='relu', learning_rate_init=1e-3)",
      "model.fit(X_train, y_train)",
      "preds = model.predict(X_test)",
      "print('Accuracy:', accuracy_score(y_test, preds))",
    ],
    []
  );

  useEffect(() => {
    const full = lines.join("\n");
    if (text.length < full.length) {
      const t = setTimeout(() => setText(full.slice(0, text.length + 1)), 18);
      return () => clearTimeout(t);
    }
  }, [text, lines]);

  useEffect(() => {
    const i = setInterval(() => setCursor((c) => !c), 600);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0B0B0C]">
      {/* window chrome */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0F0F10]/90 backdrop-blur">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="text-xs text-white/60 font-mono">classifier.py</div>
        <div className="w-16" />
      </div>

      {/* code area */}
      <div className="relative p-6 font-mono text-sm leading-6 min-h-[320px] text-white">
        {/* grid/scan effect */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(139,92,246,0.12),transparent_30%)]" />
        <pre className="relative whitespace-pre-wrap">
          {text}
          <span className={`ml-0.5 ${cursor ? "opacity-100" : "opacity-0"}`}>|
          </span>
        </pre>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      </div>
    </div>
  );
}

// === Simple icon (inline SVG) ===
function Icon({ path, className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

// === Feature Card ===
function FeatureCard({ iconPath, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative rounded-2xl p-[1px] bg-gradient-to-br from-cyan-500/30 to-violet-500/30"
    >
      <div className="relative h-full rounded-2xl bg-[#0F0F10]/80 backdrop-blur-xl border border-white/10 p-6">
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl text-cyan-300 bg-white/5 ring-1 ring-cyan-500/20">
          <Icon className="w-6 h-6" path={iconPath} />
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
        <p className="text-white/70 text-sm leading-6">{description}</p>
        <div className="pointer-events-none absolute -inset-px rounded-2xl shadow-[0_0_60px_-10px_rgba(59,130,246,0.25)]" />
      </div>
    </motion.div>
  );
}

// === Category Card ===
function CategoryCard({ code, name, problems, gradient }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0F0F10]"
      style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.35)" }}
    >
      <div className="absolute inset-0 opacity-80" style={{ background: gradient }} />
      <div className="relative p-6 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-black/60 text-white font-bold text-lg border border-white/10">
            {code}
          </div>
          <div className="text-right text-white">
            <div className="text-2xl font-bold">{problems}</div>
            <div className="text-white/70 text-xs">Problems</div>
          </div>
        </div>
        <h4 className="text-white font-semibold text-xl mb-1">{name}</h4>
        <p className="text-white/70 text-sm">Dive into curated challenges with real datasets & evaluation.</p>
        <div className="mt-4 inline-flex items-center text-cyan-300 font-medium">
          Start Learning
          <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 rounded-2xl" />
    </motion.div>
  );
}

export default function LandingPage() {
  const features = [
    {
      iconPath: "M3 12h7l-2 9 5-16 2 7h6",
      title: "Real-world AI Problems",
      description: "Work on industry-grade tasks spanning vision, NLP, and tabular ML with clear constraints and datasets.",
    },
    {
      iconPath: "M12 20l4-8H8l4-8M4 20h16",
      title: "Hints & Solutions",
      description: "Unlock multi-step hints, editorial-grade explanations, and benchmark solutions when you’re stuck.",
    },
    {
      iconPath: "M8 21v-7m8 7v-4M4 10l8-6 8 6-8 6-8-6z",
      title: "Leaderboards",
      description: "Compete on accuracy, runtime, and memory; climb weekly and all-time boards across tracks.",
    },
    {
      iconPath: "M4 4h16v8H4V4zm0 12h10",
      title: "Custom Test Cases",
      description: "Create edge-case generators, run hidden tests, and compare diffs directly in the editor.",
    },
  ];

  const categories = [
    {
      code: "AI",
      name: "Artificial Intelligence",
      problems: 42,
      gradient: "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(139,92,246,0.18))",
    },
    {
      code: "ML",
      name: "Machine Learning",
      problems: 58,
      gradient: "linear-gradient(135deg, rgba(6,182,212,0.20), rgba(59,130,246,0.18))",
    },
    {
      code: "DL",
      name: "Deep Learning",
      problems: 51,
      gradient: "linear-gradient(135deg, rgba(139,92,246,0.20), rgba(6,182,212,0.18))",
    },
    {
      code: "GenAI",
      name: "Generative AI",
      problems: 37,
      gradient: "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(139,92,246,0.25))",
    },
  ];

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* decorative background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0F0F10]" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] rounded-full blur-3xl opacity-30" style={gradientBg} />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur bg-[#000000]/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl" style={gradientBg} />
            <span className="font-bold tracking-tight text-white">CodeAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-white/70">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#categories" className="hover:text-white transition">Categories</a>
            <a href="#testimonials" className="hover:text-white transition">Stories</a>
          </nav>
          <a href="#cta" className="hidden md:inline-flex text-sm px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5">Get Started</a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-extrabold leading-tight"
            >
              <span className="block">Master AI</span>
              {/* FIXED gradient text */}
              <span className="block bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
                Problem-Solving
              </span>
            </motion.h1>

            <p className="mt-6 text-white/70 text-lg max-w-xl">
              Practice AI, ML, DL, and Generative AI challenges with an editor, hints, analytics, and leaderboard—built for developers.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {/* FIXED gradient button */}
              <a
                href="#categories"
                className="px-6 py-3 rounded-xl font-medium text-white shadow-lg transition-all duration-300 bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 hover:opacity-90 hover:shadow-cyan-500/40"
              >
                Start Coding
              </a>
              <a
                href="#features"
                className="px-6 py-3 rounded-xl font-medium border border-white/20 text-white hover:border-cyan-400 hover:text-cyan-300 transition"
              >
                View Features
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-xs text-white/60">Problems</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400">⏱️</div>
                <div className="text-xs text-white/60">Runtime Scoring</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-violet-400">⚡</div>
                <div className="text-xs text-white/60">Editor Hints</div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-cyan-300 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              AI-Powered Learning Platform
            </div>
            <CodeShowcase />
          </motion.div>
        </div>
      </section>


      {/* FEATURES */}
      <section id="features" className="relative py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold">Why Choose CodeAI?</h2>
            <p className="mt-3 text-white/70 max-w-2xl mx-auto">
              A developer-first platform with futuristic UI and rigorous evaluations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="relative py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold">Choose Your Track</h2>
            <p className="mt-3 text-white/70 max-w-2xl mx-auto">
              Curated paths across AI disciplines with neon-glow interactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((c, i) => (
              <CategoryCard key={i} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="relative py-20 border-t border-white/10 bg-[#0F0F10]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold">Loved by Learners</h2>
            <p className="mt-3 text-white/70">Real stories from developers mastering AI.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{
              name: "Rajeev Kumar",
              role: "DSAI · IIT Bhilai",
              quote: "Clean UI, great problems, and editorial solutions that actually teach.",
              avatar: "https://i.pravatar.cc/120?img=11",
            }, {
              name: "Aditya Rehpade",
              role: "EE · IIT Bhilai",
              quote: "Finally a platform tuned for AI workflows—from datasets to metrics.",
              avatar: "https://i.pravatar.cc/120?img=12",
            }, {
              name: "Sana Iqbal",
              role: "ML Engineer",
              quote: "Leaderboards kept me accountable. The glow UI is slick.",
              avatar: "https://i.pravatar.cc/120?img=32",
            }].map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
                className="rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-white/70">{t.role}</div>
                  </div>
                </div>
                <p className="text-white/80 leading-6">“{t.quote}”</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative py-20 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="rounded-3xl p-[1px]" style={gradientBg}>
            <div className="rounded-3xl bg-[#0B0B0C] px-6 md:px-14 py-14">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-3">Ready to Level Up?</h3>
              <p className="text-white/70 mb-8">Join and start solving AI challenges with editor hints and analytics.</p>

              <form onSubmit={submit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 placeholder-white/40 focus:outline-none focus:ring-4 focus:ring-violet-500/20"
                />
                <button
                  type="submit"
                  disabled={sent}
                  className={`${primaryBtn} disabled:opacity-60`}
                  style={gradientBg}
                >
                  {sent ? "Sent!" : "Get Started"}
                </button>
              </form>
              <div className="mt-3 text-xs text-white/60">Free • No credit card required</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg" style={gradientBg} />
            <span className="font-semibold">CodeAI</span>
          </div>
          <div className="flex items-center gap-6 text-white/70">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Support</a>
          </div>
          <div className="text-white/50 text-sm">© {new Date().getFullYear()} CodeAI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}