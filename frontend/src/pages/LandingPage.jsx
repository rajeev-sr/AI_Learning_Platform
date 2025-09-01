import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Zap, Target, Users, Bot, Database, Network, Sparkles } from 'lucide-react';
import NavbarPublic from '../components/NavbarPublic';
import Footer from '../components/Footer';
import Button from '../components/Button';
import FeatureCard from '../components/FeatureCard';
import CategoryCard from '../components/CategoryCard';
import TestimonialCard from '../components/TestimonialCard';
import CodeShowcase from '../components/CodeShowcase';

/**
 * Landing page for non-authenticated users
 * Features hero section, feature grid, categories, testimonials
 */
const LandingPage = () => {
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);

  // Sample code for the showcase
  const showcaseCode = `import torch
import torch.nn as nn
from transformers import GPT2Model

class AIAgent(nn.Module):
    def __init__(self, vocab_size, hidden_dim=512):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, hidden_dim)
        self.transformer = GPT2Model.from_pretrained('gpt2')
        self.classifier = nn.Linear(hidden_dim, vocab_size)
        
    def forward(self, x):
        # Encode input sequence
        embedded = self.embedding(x)
        
        # Process through transformer
        output = self.transformer(embedded)
        
        # Generate predictions
        logits = self.classifier(output.last_hidden_state)
        
        return logits

# Train the model
model = AIAgent(vocab_size=50000)
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-4)

# Advanced training loop with gradient accumulation
for epoch in range(100):
    for batch in dataloader:
        outputs = model(batch['input_ids'])
        loss = criterion(outputs, batch['labels'])
        
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()
        
    print(f"Epoch {epoch}: Loss = {loss.item():.4f}")`;

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  // Features data
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Personalized learning paths adapted to your skill level with intelligent problem recommendations and hints.'
    },
    {
      icon: Zap,
      title: 'Real-time Feedback',
      description: 'Instant code execution and feedback with detailed explanations for optimal learning outcomes.'
    },
    {
      icon: Target,
      title: 'Skill Assessment',
      description: 'Comprehensive skill evaluation with detailed analytics and progress tracking across all AI domains.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Learn from peers, participate in challenges, and contribute to a growing community of AI practitioners.'
    }
  ];

  // Categories data
  const categories = [
    {
      icon: Brain,
      title: 'Machine Learning',
      description: 'Classical ML algorithms, supervised/unsupervised learning, feature engineering.',
      problemCount: 156,
      color: 'blue'
    },
    {
      icon: Network,
      title: 'Deep Learning',
      description: 'Neural networks, CNNs, RNNs, transformers, and modern architectures.',
      problemCount: 89,
      color: 'purple'
    },
    {
      icon: Bot,
      title: 'Generative AI',
      description: 'LLMs, diffusion models, GANs, and cutting-edge generative techniques.',
      problemCount: 67,
      color: 'cyan'
    },
    {
      icon: Database,
      title: 'AI Engineering',
      description: 'MLOps, model deployment, optimization, and production AI systems.',
      problemCount: 43,
      color: 'green'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      content: "CodeAI transformed my understanding of machine learning. The progressive difficulty and real-world problems made learning both challenging and enjoyable.",
      author: "Sarah Chen",
      role: "ML Engineer",
      company: "Google",
      rating: 5
    },
    {
      content: "The best platform for practicing AI concepts. The code execution environment and instant feedback helped me land my dream job at a top tech company.",
      author: "Marcus Rodriguez",
      role: "AI Research Scientist",
      company: "OpenAI",
      rating: 5
    },
    {
      content: "As a beginner in AI, I was intimidated by the complexity. CodeAI's structured approach and community support made the journey manageable and fun.",
      author: "Priya Patel",
      role: "Data Scientist",
      company: "Meta",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-dark-300 to-black">
      <NavbarPublic />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Hero content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Master{' '}
                  <span className="gradient-text">
                    AI Problem-Solving
                  </span>
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                  Level up your artificial intelligence skills with hands-on challenges, 
                  real-world projects, and an AI-powered learning companion.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={handleSignUp}
                  disabled={isSigningUp}
                  className="min-w-40"
                >
                  {isSigningUp ? 'Creating Account...' : 'Start Learning'}
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => document.getElementById('features').scrollIntoView()}
                >
                  Explore Features
                </Button>
              </div>

              {/* Quick stats */}
              <div className="flex items-center space-x-8 pt-8 border-t border-gray-800/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">10k+</div>
                  <div className="text-sm text-gray-400">Active Learners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">355</div>
                  <div className="text-sm text-gray-400">AI Problems</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right side - Code showcase */}
            <div className="lg:pl-8">
              <CodeShowcase 
                code={showcaseCode}
                height="h-64 sm:h-72 lg:h-96"
                className="shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose <span className="gradient-text">CodeAI</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with proven learning methodologies
              to accelerate your AI journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Explore <span className="gradient-text">AI Domains</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose your learning path from our comprehensive collection of AI and ML challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                icon={category.icon}
                title={category.title}
                description={category.description}
                problemCount={category.problemCount}
                color={category.color}
                onClick={() => console.log(`Navigate to ${category.title}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Loved by <span className="gradient-text">Developers</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join thousands of developers who have accelerated their AI careers with CodeAI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                content={testimonial.content}
                author={testimonial.author}
                role={testimonial.role}
                company={testimonial.company}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <Sparkles className="h-12 w-12 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Your AI Journey?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join our community of learners and start solving AI challenges today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleSignUp}
            >
              Get Started Free
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => document.getElementById('features').scrollIntoView()}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;