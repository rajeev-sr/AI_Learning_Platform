import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';

const mockQuestionData = {
  1: {
    title: "Neural Network Implementation",
    difficulty: "Advanced",
    category: "AI",
    description: "Implement a basic neural network from scratch using only NumPy. Your implementation should support forward propagation, backward propagation, and gradient descent optimization.",
    examples: [
      {
        input: "X = [[0, 0], [0, 1], [1, 0], [1, 1]], y = [0, 1, 1, 0]",
        output: "XOR function approximation with accuracy > 90%"
      }
    ],
    constraints: [
      "Use only NumPy for computations",
      "Implement at least one hidden layer",
      "Support configurable learning rate",
      "Include bias terms"
    ],
    starterCode: `import numpy as np

def neural_network(X, y, hidden_size=4, learning_rate=0.1, epochs=1000):
    """
    Implement a neural network with one hidden layer
    
    Args:
        X: Input data (n_samples, n_features)
        y: Target values (n_samples,)
        hidden_size: Number of neurons in hidden layer
        learning_rate: Learning rate for gradient descent
        epochs: Number of training epochs
    
    Returns:
        Trained weights and predictions
    """
    # Initialize your implementation here
    
    return predictions`,
    hints: [
      "Initialize weights randomly using np.random.randn()",
      "Use sigmoid activation function for hidden and output layers",
      "Implement forward pass: z1 = X @ W1 + b1, a1 = sigmoid(z1), etc.",
      "For backward pass, compute gradients using chain rule"
    ]
  }
};

export default function Workspace({ question, onRun, onHint, onOptimized, result }) {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('problem');
  const [output, setOutput] = useState(null);
  const [hints, setHints] = useState([]);
  const [optimizedSolution, setOptimizedSolution] = useState('');

  const currentQuestion = mockQuestionData[questionId] || mockQuestionData[1];

  useEffect(() => {
    if (currentQuestion?.starterCode) {
      setCode(currentQuestion.starterCode);
    }
  }, [currentQuestion]);

  const handleRunCode = async () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setOutput({
        success: true,
        executionTime: "1.2s",
        testsPassed: 3,
        totalTests: 5,
        stdout: "Training completed.\nEpoch 100/1000 - Loss: 0.245\nEpoch 200/1000 - Loss: 0.123\n...\nFinal accuracy: 92.5%",
        feedback: "Good implementation! Consider using vectorized operations for better performance."
      });
      setIsRunning(false);
    }, 2000);
  };

  const handleGetHint = () => {
    const newHint = currentQuestion.hints[hints.length % currentQuestion.hints.length];
    setHints([...hints, newHint]);
  };

  const handleGetOptimized = () => {
    setOptimizedSolution(`import numpy as np

def optimized_neural_network(X, y, hidden_size=4, learning_rate=0.1, epochs=1000):
    """
    Optimized neural network implementation with vectorized operations
    """
    # Initialize weights with Xavier initialization
    W1 = np.random.randn(X.shape[1], hidden_size) * np.sqrt(2.0 / X.shape[1])
    b1 = np.zeros((1, hidden_size))
    W2 = np.random.randn(hidden_size, 1) * np.sqrt(2.0 / hidden_size)
    b2 = np.zeros((1, 1))
    
    # Training loop with vectorized operations
    for epoch in range(epochs):
        # Forward pass
        z1 = X @ W1 + b1
        a1 = 1 / (1 + np.exp(-z1))  # Sigmoid activation
        z2 = a1 @ W2 + b2
        predictions = 1 / (1 + np.exp(-z2))
        
        # Backward pass
        m = X.shape[0]
        dz2 = predictions - y.reshape(-1, 1)
        dW2 = (1/m) * a1.T @ dz2
        db2 = (1/m) * np.sum(dz2, axis=0, keepdims=True)
        
        da1 = dz2 @ W2.T
        dz1 = da1 * a1 * (1 - a1)
        dW1 = (1/m) * X.T @ dz1
        db1 = (1/m) * np.sum(dz1, axis=0, keepdims=True)
        
        # Update weights
        W1 -= learning_rate * dW1
        b1 -= learning_rate * db1
        W2 -= learning_rate * dW2
        b2 -= learning_rate * db2
    
    return predictions.flatten()`);
    setActiveTab('optimized');
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Back
            </button>
            <div className="h-6 w-px bg-slate-300"></div>
            <h1 className="text-xl font-semibold text-slate-900">{currentQuestion.title}</h1>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              currentQuestion.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
              currentQuestion.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
              currentQuestion.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {currentQuestion.difficulty}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              45-60 min
            </div>
            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition">
              Save Progress
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel - Problem Description */}
        <div className="w-2/5 bg-white border-r border-slate-200 flex flex-col">
          {/* Tabs */}
          <div className="border-b border-slate-200">
            <div className="flex">
              {['problem', 'hints', 'optimized'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium text-sm capitalize border-b-2 transition ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab}
                  {tab === 'hints' && hints.length > 0 && (
                    <span className="ml-2 bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {hints.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'problem' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-3">Problem Description</h2>
                  <p className="text-slate-700 leading-relaxed">{currentQuestion.description}</p>
                </div>

                <div>
                  <h3 className="font-medium text-slate-900 mb-2">Examples</h3>
                  {currentQuestion.examples.map((example, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-lg p-4 space-y-2">
                      <div>
                        <span className="text-sm font-medium text-slate-600">Input:</span>
                        <pre className="text-sm text-slate-800 mt-1 font-mono">{example.input}</pre>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-slate-600">Expected Output:</span>
                        <pre className="text-sm text-slate-800 mt-1 font-mono">{example.output}</pre>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="font-medium text-slate-900 mb-2">Constraints</h3>
                  <ul className="space-y-1">
                    {currentQuestion.constraints.map((constraint, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-slate-400 mt-1">•</span>
                        {constraint}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'hints' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">Hints</h2>
                  <button
                    onClick={handleGetHint}
                    className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition"
                  >
                    Get Hint
                  </button>
                </div>
                
                {hints.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-slate-400">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                      </svg>
                    </div>
                    <p className="text-slate-600">Click "Get Hint" when you need help!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {hints.map((hint, idx) => (
                      <div key={idx} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {idx + 1}
                          </div>
                          <p className="text-sm text-slate-700">{hint}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'optimized' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">Optimized Solution</h2>
                  {!optimizedSolution && (
                    <button
                      onClick={handleGetOptimized}
                      className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg text-sm font-medium transition"
                    >
                      Show Solution
                    </button>
                  )}
                </div>
                
                {optimizedSolution ? (
                  <div className="bg-slate-900 rounded-lg overflow-hidden">
                    <div className="p-3 bg-slate-800 text-slate-300 text-sm font-medium">
                      Optimized Implementation
                    </div>
                    <pre className="p-4 text-sm text-green-400 overflow-x-auto">
                      <code>{optimizedSolution}</code>
                    </pre>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-slate-400">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/>
                      </svg>
                    </div>
                    <p className="text-slate-600">Try solving the problem first, then check the optimized solution!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="flex-1 flex flex-col">
          {/* Editor Header */}
          <div className="bg-slate-800 text-white px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm font-medium">solution.py</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition ${
                  isRunning
                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isRunning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                    Running...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-12a2 2 0 11-4 0 2 2 0 014 0zM5 12a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    Run Code
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 bg-slate-900">
            <Editor
              height="100%"
              defaultLanguage="python"
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                automaticLayout: true,
              }}
              onMount={(editor) => {
                editorRef.current = editor;
              }}
            />
          </div>

          {/* Output Panel */}
          {output && (
            <div className="border-t border-slate-300 bg-white p-6 max-h-64 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">Output</h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className={`flex items-center gap-1 ${output.success ? 'text-green-600' : 'text-red-600'}`}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={output.success ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"}/>
                    </svg>
                    {output.testsPassed}/{output.totalTests} Tests Passed
                  </span>
                  <span className="text-slate-500">Time: {output.executionTime}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-medium text-slate-900 mb-2">Console Output</h4>
                  <pre className="text-sm text-slate-700 font-mono whitespace-pre-wrap">{output.stdout}</pre>
                </div>
                
                {output.feedback && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">AI Feedback</h4>
                    <p className="text-sm text-blue-800">{output.feedback}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}