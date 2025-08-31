import { useState, useEffect } from 'react';
import { tokenizeCode, getTokenClassName } from '../utils/syntaxHighlighter';
import PropTypes from 'prop-types';

/**
 * CodeShowcase component with typing animation and syntax highlighting
 * Fixed height container to prevent layout shifts during typing
 */
const CodeShowcase = ({ 
  code = '', 
  className = '', 
  height = 'h-96',
  enableTyping = true 
}) => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Typing animation effect
  useEffect(() => {
    if (!enableTyping || !code) return;

    const timer = setTimeout(() => {
      if (currentIndex < code.length) {
        setDisplayedCode(code.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, 50); // Typing speed

    return () => clearTimeout(timer);
  }, [currentIndex, code, enableTyping]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 1000);

    return () => clearInterval(cursorTimer);
  }, []);

  // Reset typing when code changes
  useEffect(() => {
    setCurrentIndex(0);
    setDisplayedCode('');
  }, [code]);

  const tokens = tokenizeCode(displayedCode);

  return (
    <div 
      className={`
        ${height} w-full bg-black/50 rounded-lg border border-gray-800
        overflow-hidden relative group glow-hover code-editor
        ${className}
      `}
      role="img"
      aria-label="Code example showcase"
    >
      {/* Header bar */}
      <div className="h-8 bg-gray-900/50 border-b border-gray-800 flex items-center px-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-xs text-gray-400">main.py</div>
      </div>

      {/* Code content */}
      <div className="h-full overflow-y-auto p-4 font-mono text-sm leading-relaxed">
        <div className="min-h-full">
          {tokens.map((token, index) => (
            <span 
              key={index} 
              className={getTokenClassName(token.type)}
            >
              {token.value}
            </span>
          ))}
          {enableTyping && currentIndex < code.length && (
            <span 
              className={`inline-block w-2 h-5 bg-cyan-400 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
              aria-hidden="true"
            />
          )}
        </div>
      </div>

      {/* Gradient overlay at bottom to indicate scrollable content */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
};

CodeShowcase.propTypes = {
  code: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.string,
  enableTyping: PropTypes.bool,
};

export default CodeShowcase;
