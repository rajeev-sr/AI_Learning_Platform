import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Questions from './pages/Questions';
import Workspace from './pages/Workspace';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';

/**
 * Main App component with routing configuration
 * Handles authentication state and route protection
 */
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route 
            path="/" 
            element={
              isAuthenticated ? <Home /> : <LandingPage />
            } 
          />
          
          {/* Protected routes (for authenticated users) */}
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Fallback route */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;