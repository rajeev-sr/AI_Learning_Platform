import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable gradient button component
 * Matches the design system of the AI learning platform
 */
const GradientButton = ({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  ...props 
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500
      hover:from-blue-700 hover:via-purple-700 hover:to-cyan-600
      shadow-lg hover:shadow-xl hover:shadow-blue-500/25
      text-white font-semibold
    `,
    secondary: `
      bg-gradient-to-r from-gray-700 to-gray-600
      hover:from-gray-600 hover:to-gray-500
      shadow-lg hover:shadow-xl hover:shadow-gray-500/25
      text-white font-semibold
    `,
    outline: `
      border-2 border-gray-600 text-gray-300
      hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/10
      bg-transparent font-semibold
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        ${sizeClasses[size]} ${variantClasses[variant]}
        inline-flex items-center justify-center
        rounded-lg transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
        ${isPressed && !disabled ? 'scale-95' : 'scale-100'}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      <span className={loading ? 'opacity-75' : 'opacity-100'}>
        {children}
      </span>
      
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
    </button>
  );
};

GradientButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

export default GradientButton;
