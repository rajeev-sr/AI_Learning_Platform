import { useState, useEffect } from 'react';
import { Play, Send, Lightbulb, Clock, CheckCircle, XCircle } from 'lucide-react';
import NavbarApp from '../components/NavbarApp';
import Button from '../components/Button';
import CodeShowcase from '../components/CodeShowcase';
import MetricCard from '../components/MetricCard';

/**
 * Main authenticated workspace for solving AI problems
 * Includes problem list, detail view, code editor, and results
 */
const Home = () => {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showHints, setShowHints] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // Mock user data
  const mockUser = {
    name: 'Alex Chen',
    score: 1847,
    level: 'Advanced',
    streak: 12
  };

  // Mock problems data
  const problems = [
    {
      id: 1,
      title: 'Neural Network Backpropagation',
      difficulty: 'Medium',
      category: 'Deep Learning',
      solved: true,
      likes: 234,
      description: 'Implement backpropagation algorithm for a multi-layer neural network.',
      starterCode: `import numpy as np

class NeuralNetwork:
    def __init__(self, layers):
        self.layers = layers
        self.weights = []
        self.biases = []
        
        # Initialize weights and biases
        for i in range(len(layers) - 1):
            # Your implementation here
            pass
    
    def forward(self, X):
        # Implement forward pass
        pass
    
    def backward(self, X, y):
        # Implement backpropagation
        pass`,
      hints: [
        'Start by initializing weights using Xavier/He initialization',
        'Remember to apply activation functions in forward pass',
        'Calculate gradients using chain rule in reverse order'
      ]
    },
    {
      id: 2,
      title: 'Transformer Attention Mechanism',
      difficulty: 'Hard',
      category: 'NLP',
      solved: false,
      likes: 189,
      description: 'Build a multi-head attention mechanism from scratch.',
      starterCode: `import torch
import torch.nn as nn

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        # Your implementation here
        
    def forward(self, query, key, value, mask=None):
        # Implement attention mechanism
        pass`,
      hints: [
        'Split d_model into num_heads for parallel attention',
        'Compute attention scores using scaled dot-product',
        'Apply softmax and use mask to handle padding'
      ]
    },
    {
      id: 3,
      title: 'GAN Loss Function',
      difficulty: 'Easy',
      category: 'Generative AI',
      solved: false,
      likes: 156,
      description: 'Implement the loss functions for a basic GAN.',
      starterCode: `import torch
import torch.nn.functional as F

def discriminator_loss(real_output, fake_output):
    # Implement discriminator loss
    pass

def generator_loss(fake_output):
    # Implement generator loss
    pass`,
      hints: [
        'Use binary cross-entropy for discriminator loss',
        'Discriminator should distinguish real from fake',
        'Generator should fool the discriminator'
      ]
    }
  ];

  useEffect(() => {
    // Set first problem as selected by default
    if (problems.length > 0) {
      setSelectedProblem(problems[0]);
      setUserCode(problems[0].starterCode);
    }
  }, []);

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
    setUserCode(problem.starterCode);
    setTestResults(null);
    setShowHints(false);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    // Mock code execution
    setTimeout(() => {
      setTestResults({
        passed: 2,
        total: 3,
        results: [
          { name: 'Test Basic Functionality', passed: true, time: '0.12s' },
          { name: 'Test Edge Cases', passed: true, time: '0.08s' },
          { name: 'Test Performance', passed: false, time: '2.34s', error: 'Time limit exceeded' }
        ]
      });
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = () => {
    console.log('Submitting solution...');
    // Mock submission logic
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Easy': 'text-green-400 bg-green-500/10',
      'Medium': 'text-yellow-400 bg-yellow-500/10',
      'Hard': 'text-red-400 bg-red-500/10'
    };
    return colors[difficulty] || 'text-gray-400 bg-gray-500/10';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-dark-300 to-black">
      <NavbarApp user={mockUser} />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Top metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Problems Solved"
              value="47"
              subtitle="This month"
              trend={12}
            />
            <MetricCard
              title="Current Streak"
              value="12"
              subtitle="Days"
              trend={0}
            />
            <MetricCard
              title="Ranking"
              value="#156"
              subtitle="Global"
              trend={-5}
            />
            <MetricCard
              title="Accuracy"
              value="89%"
              subtitle="Average"
              trend={3}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Problem list */}
            <div className="lg:col-span-1">
              <div className="glass rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Problem Set</h2>
                <div className="space-y-3">
                  {problems.map((problem) => (
                    <button
                      key={problem.id}
                      onClick={() => handleProblemSelect(problem)}
                      className={`
                        w-full text-left p-4 rounded-lg border transition-all duration-200 focus-ring
                        ${selectedProblem?.id === problem.id 
                          ? 'border-cyan-500 bg-cyan-500/10' 
                          : 'border-gray-700 hover:border-gray-600 hover:bg-white/5'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-white text-sm">
                          {problem.title}
                        </h3>
                        {problem.solved && (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                        <span className="text-xs text-gray-500">{problem.category}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main workspace */}
            <div className="lg:col-span-2 space-y-6">
              {selectedProblem && (
                <>
                  {/* Problem details */}
                  <div className="glass rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h1 className="text-2xl font-bold text-white">
                        {selectedProblem.title}
                      </h1>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm px-3 py-1 rounded ${getDifficultyColor(selectedProblem.difficulty)}`}>
                          {selectedProblem.difficulty}
                        </span>
                        <span className="text-sm text-gray-400">{selectedProblem.likes} likes</span>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedProblem.description}
                    </p>
                  </div>

                  {/* Code editor */}
                  <div className="glass rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-white">Solution</h2>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowHints(!showHints)}
                        >
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Hints ({selectedProblem.hints.length})
                        </Button>
                      </div>
                    </div>

                    <CodeShowcase
                      code={userCode}
                      height="h-80"
                      enableTyping={false}
                      className="mb-4"
                    />

                    {/* Code editor controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="secondary"
                          onClick={handleRunCode}
                          disabled={isRunning}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          {isRunning ? 'Running...' : 'Run Code'}
                        </Button>
                        <Button
                          variant="primary"
                          onClick={handleSubmit}
                          disabled={isRunning}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Submit
                        </Button>
                      </div>
                      
                      {testResults && (
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="text-gray-400">
                            {testResults.passed}/{testResults.total} tests passed
                          </span>
                          {testResults.passed === testResults.total ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-400" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hints panel */}
                  {showHints && (
                    <div className="glass rounded-xl p-6 border border-yellow-500/30">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Lightbulb className="h-5 w-5 text-yellow-400 mr-2" />
                        Hints
                      </h3>
                      <div className="space-y-3">
                        {selectedProblem.hints.map((hint, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <span className="text-yellow-400 font-mono text-sm mt-1">
                              {index + 1}.
                            </span>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {hint}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Test results */}
                  {testResults && (
                    <div className="glass rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Clock className="h-5 w-5 text-cyan-400 mr-2" />
                        Test Results
                      </h3>
                      <div className="space-y-3">
                        {testResults.results.map((result, index) => (
                          <div 
                            key={index}
                            className={`
                              flex items-center justify-between p-3 rounded-lg border
                              ${result.passed 
                                ? 'border-green-500/30 bg-green-500/5' 
                                : 'border-red-500/30 bg-red-500/5'
                              }
                            `}
                          >
                            <div className="flex items-center space-x-3">
                              {result.passed ? (
                                <CheckCircle className="h-5 w-5 text-green-400" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-400" />
                              )}
                              <span className="text-white text-sm">{result.name}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                              <span>{result.time}</span>
                              {result.error && (
                                <span className="text-red-400">({result.error})</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
