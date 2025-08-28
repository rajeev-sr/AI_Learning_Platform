import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

/**
 * LandingPage.jsx
 * - React + Tailwind v4 friendly
 * - Fixed-size, scrollable CodeShowcase to avoid layout shifts
 * - Robust tokenizer highlighter (safe HTML encoding)
 * - Consistent button styling and responsive layout
 */

/* -------------------- Shared classes / inline gradient -------------------- */
const btnBase =
  "inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition focus:outline-none focus-visible:ring-4";
const primaryBtnBase = `${btnBase} text-white shadow-lg`;
const secondaryBtnBase = `${btnBase} text-white/90 border border-white/10 bg-transparent`;

const gradientBg = {
  background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
};

/* -------------------- CodeShowcase -------------------- */
function CodeShowcase() {
  const [text, setText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  const lines = useMemo(
    () => [
      "# Solving: Multi-Class Image Classifier",
      "import numpy as np",
      "from sklearn.model_selection import train_test_split",
      "from sklearn.metrics import accuracy_score",
      "from sklearn.neural_network import MLPClassifier",
      "",
      "X_train, X_test, y_train, y_test = train_test_split(X, y,",
      "                            random_state=42)",
      "model = MLPClassifier(hidden_layer_sizes=(256,128),",
      "                            activation='relu',",
      "                            learning_rate_init=1e-3)",
      "model.fit(X_train, y_train)",
      "preds = model.predict(X_test)",
      "print('Accuracy:', accuracy_score(y_test, preds))",
    ],
    []
  );

  // Typing effect (adds characters to `text`). Fixed box prevents layout shifts.
  useEffect(() => {
    const full = lines.join("\n");
    if (text.length < full.length) {
      const t = setTimeout(() => setText(full.slice(0, text.length + 1)), 18);
      return () => clearTimeout(t);
    }
  }, [text, lines]);

  // Cursor blink
  useEffect(() => {
    const i = setInterval(() => setCursorVisible((c) => !c), 600);
    return () => clearInterval(i);
  }, []);

  // Simple safe html escape
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // Tokenizer-based highlighter (avoids breaking entities)
  function highlight(code) {
    const keywords = new Set([
      "import",
      "from",
      "class",
      "def",
      "return",
      "print",
      "for",
      "while",
      "if",
      "else",
      "elif",
      "as",
      "with",
      "in",
      "try",
      "except",
      "break",
      "continue",
      "pass",
      "lambda",
    ]);

    let i = 0;
    const n = code.length;
    let out = "";

    while (i < n) {
      const ch = code[i];

      // comment
      if (ch === "#") {
        const j = code.indexOf("\n", i);
        const end = j === -1 ? n : j;
        const comment = code.slice(i, end);
        out += `<span class="text-green-400">${escapeHtml(comment)}</span>`;
        i = end;
        continue;
      }

      // string (single or double)
      if (ch === '"' || ch === "'") {
        const quote = ch;
        let j = i + 1;
        let escaped = false;
        while (j < n) {
          if (code[j] === "\\" && !escaped) {
            escaped = true;
            j++;
            continue;
          }
          if (code[j] === quote && !escaped) {
            j++;
            break;
          }
          escaped = false;
          j++;
        }
        const str = code.slice(i, Math.min(j, n));
        out += `<span class="text-amber-300">${escapeHtml(str)}</span>`;
        i = j;
        continue;
      }

      // number
      if (/\d/.test(ch)) {
        const m = code.slice(i).match(/^\d+(\.\d+)?/);
        if (m) {
          out += `<span class="text-cyan-300">${escapeHtml(m[0])}</span>`;
          i += m[0].length;
          continue;
        }
      }

      // identifier / function name / keyword
      if (/[A-Za-z_]/.test(ch)) {
        const m = code.slice(i).match(/^[A-Za-z_]\w*/);
        if (m) {
          const id = m[0];
          const nextChar = code[i + id.length] || "";
          if (keywords.has(id)) {
            out += `<span class="text-pink-400">${escapeHtml(id)}</span>`;
          } else if (nextChar === "(") {
            out += `<span class="text-violet-300">${escapeHtml(id)}</span>`;
          } else {
            out += escapeHtml(id);
          }
          i += id.length;
          continue;
        }
      }

      // whitespace / punctuation
      out += escapeHtml(ch);
      i++;
    }

    return out;
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0B0B0C] h-64 sm:h-72 md:h-80 lg:h-96">
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

      {/* code area (fixed height, scrollable) */}
      <div className="relative p-6 font-mono text-sm leading-6 h-[calc(100%-3rem)] overflow-y-auto text-white">
        {/* radial subtle color */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(400px 200px at 10% 10%, rgba(59,130,246,0.06), transparent 15%), radial-gradient(300px 150px at 85% 0%, rgba(139,92,246,0.05), transparent 12%)",
          }}
        />

        {/* shimmer and overlay (pure css rules defined below) */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute inset-0 shimmer" />
        </div>

        {/* highlighted code safely injected */}
        <pre
          className="relative whitespace-pre-wrap z-10 font-[SFMono-Regular,Menlo,Monaco,Consolas,monospace] text-sm"
          dangerouslySetInnerHTML={{
            __html:
              highlight(text) +
              `<span class="${cursorVisible ? "opacity-100 cursorGlow" : "opacity-0"}">|</span>`,
          }}
        />
      </div>

      {/* small inline styles (keyframes) */}
      <style>{`
        @keyframes shimmerAnim { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes cursorGlowAnim { 0%{ text-shadow: 0 0 2px rgba(6,182,212,0.7); } 50%{ text-shadow: 0 0 8px rgba(6,182,212,0.85); } 100%{ text-shadow: 0 0 2px rgba(6,182,212,0.7); } }
        .shimmer { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.02), transparent); background-size: 200% 100%; animation: shimmerAnim 6s linear infinite; }
        .cursorGlow { animation: cursorGlowAnim 1.2s steps(1,end) infinite; color: #9be7ff; }
      `}</style>
    </div>
  );
}

/* -------------------- small svg icon -------------------- */
function Icon({ path, className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

/* -------------------- FeatureCard -------------------- */
function FeatureCard({ iconPath, title, description }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="relative rounded-2xl p-[1px] bg-gradient-to-br from-cyan-500/25 to-violet-500/25">
      <div className="relative h-full rounded-2xl bg-[#0F0F10]/80 backdrop-blur border border-white/10 p-6">
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl text-cyan-300 bg-white/5 ring-1 ring-cyan-500/12">
          <Icon className="w-6 h-6" path={iconPath} />
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
        <p className="text-white/70 text-sm leading-6">{description}</p>
        <div className="pointer-events-none absolute -inset-px rounded-2xl shadow-[0_0_40px_-10px_rgba(59,130,246,0.18)]" />
      </div>
    </motion.div>
  );
}

/* -------------------- CategoryCard -------------------- */
function CategoryCard({ code, name, problems, gradient }) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0F0F10]" style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.35)" }}>
      <div className="absolute inset-0 opacity-70" style={{ background: gradient }} />
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

/* -------------------- Main Landing Page -------------------- */
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
    setTimeout(() => setSent(false), 1800);
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* animated gradient helper (used for text/button backgrounds) */}
      <style>{`
        @keyframes gradientMove { 0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%} }
        .animated-gradient-text { background: linear-gradient(90deg,#3B82F6,#06B6D4,#8B5CF6); background-size:200% 200%; -webkit-background-clip:text; background-clip:text; color:transparent; animation: gradientMove 6s ease infinite; }
        .animated-gradient-bg { background: linear-gradient(90deg,#3B82F6,#06B6D4,#8B5CF6); background-size:200% 200%; animation: gradientMove 6s ease infinite; }
        .btn-focus { box-shadow: 0 0 0 6px rgba(59,130,246,0.06); }
      `}</style>

      {/* decorative background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0F0F10]" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-28" style={gradientBg} />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/16 to-transparent" />
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-white/8 backdrop-blur bg-[#000000]/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl animated-gradient-bg shadow-lg" />
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
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          {/* Left: text */}
          <div className="flex flex-col justify-center">
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl lg:text-6xl font-extrabold leading-tight">
              <span className="block">Master AI</span>
              <span className="block animated-gradient-text">Problem-Solving</span>
            </motion.h1>

            <p className="mt-6 text-white/70 text-base md:text-lg max-w-xl">
              Practice AI, ML, DL, and Generative AI challenges with a developer-first editor, step-by-step hints, and performance analytics.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#categories"
                className={`${primaryBtnBase} animated-gradient-bg btn-focus`}
                style={{ minWidth: 140 }}
              >
                Start Coding
              </a>

              <a
                href="#features"
                className={`${secondaryBtnBase} btn-focus hover:text-cyan-300`}
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

          {/* Right: code box (fixed size, centered) */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex justify-center items-center">
            <div className="w-full max-w-md">
              <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-cyan-300 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                AI-Powered Learning Platform
              </div>
              <CodeShowcase />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold">Why Choose CodeAI?</h2>
            <p className="mt-3 text-white/70 max-w-2xl mx-auto">A developer-first platform with futuristic UI and rigorous evaluations.</p>
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
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold">Choose Your Track</h2>
            <p className="mt-3 text-white/70 max-w-2xl mx-auto">Curated paths across AI disciplines with neon-glow interactions.</p>
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
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold">Loved by Learners</h2>
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
              <motion.div key={i} whileHover={{ y: -3 }} className="rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-xl">
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
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3">Ready to Level Up?</h3>
              <p className="text-white/70 mb-8">Join and start solving AI challenges with editor hints and analytics.</p>

              <form onSubmit={submit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 placeholder-white/40 focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-500/20"
                />
                <button
                  type="submit"
                  disabled={sent}
                  className={`${primaryBtnBase} animated-gradient-bg ${sent ? "opacity-60" : ""} btn-focus cursor-pointer`}
                  style={{ minWidth: 140 }}
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
            <div className="w-8 h-8 rounded-lg animated-gradient-bg" />
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
