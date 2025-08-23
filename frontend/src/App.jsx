import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Questions from './pages/Questions';
import Workspace from './pages/Workspace';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [result, setResult] = useState(null);
  const [user, setUser] = useState(null);

  // Mock data for development
  useEffect(() => {
    const mockQuestions = {
      AI: [
        { id: 1, title: "Neural Network Implementation", difficulty: "Advanced", category: "AI" },
        { id: 2, title: "Search Algorithm Optimization", difficulty: "Intermediate", category: "AI" },
        { id: 3, title: "Expert System Design", difficulty: "Advanced", category: "AI" }
      ],
      ML: [
        { id: 4, title: "Linear Regression from Scratch", difficulty: "Beginner", category: "ML" },
        { id: 5, title: "Decision Tree Implementation", difficulty: "Intermediate", category: "ML" },
        { id: 6, title: "K-Means Clustering", difficulty: "Intermediate", category: "ML" }
      ],
      DL: [
        { id: 7, title: "CNN for Image Classification", difficulty: "Advanced", category: "DL" },
        { id: 8, title: "RNN for Text Generation", difficulty: "Advanced", category: "DL" },
        { id: 9, title: "Transformer Architecture", difficulty: "Expert", category: "DL" }
      ],
      GenAI: [
        { id: 10, title: "GPT Fine-tuning", difficulty: "Expert", category: "GenAI" },
        { id: 11, title: "Prompt Engineering", difficulty: "Intermediate", category: "GenAI" },
        { id: 12, title: "RAG Implementation", difficulty: "Advanced", category: "GenAI" }
      ]
    };
    setQuestions(mockQuestions);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage 
              onSelectCategory={(category) => {
                setSelectedCategory(category);
                window.location.href = `/questions/${category}`;
              }} 
            />
          }
        />
        <Route
          path="/home"
          element={<Home />}
        />
        <Route
          path="/questions/:category"
          element={
            <Questions
              category={selectedCategory}
              questions={questions[selectedCategory] || []}
              onSelectQuestion={(questionId) => {
                const question = Object.values(questions).flat().find(q => q.id === questionId);
                setSelectedQuestion(question);
                window.location.href = `/workspace/${questionId}`;
              }}
            />
          }
        />
        <Route
          path="/workspace/:questionId"
          element={
            <Workspace
              question={selectedQuestion}
              onRun={(code) => {
                // Mock result for development
                setResult({
                  success: true,
                  output: "Test passed successfully",
                  executionTime: "0.2s",
                  testsPassed: 5,
                  totalTests: 5
                });
              }}
              onHint={(code) => {
                setResult({
                  hint: "Consider using vectorized operations instead of loops for better performance."
                });
              }}
              onOptimized={() => {
                setResult({
                  optimizedCode: `def optimized_solution(X, y):
    # Vectorized implementation
    return np.linalg.lstsq(X, y, rcond=None)[0]`
                });
              }}
              result={result}
            />
          }
        />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/profile" element={<Profile user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;