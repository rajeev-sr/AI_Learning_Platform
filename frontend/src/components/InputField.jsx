import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable input field component with label and error handling
 * Styled to match the dark theme of the AI learning platform
 */
const InputField = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  error, 
  required = false,
  className = '',
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`space-y-2 ${className}`}>
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-gray-300"
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 py-3 rounded-lg border transition-all duration-200
            bg-gray-900/50 text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${error 
              ? 'border-red-500 focus:ring-red-500' 
              : isFocused 
                ? 'border-blue-500' 
                : 'border-gray-600 hover:border-gray-500'
            }
          `}
          {...props}
        />
        
        {/* Focus ring effect */}
        {isFocused && !error && (
          <div className="absolute inset-0 rounded-lg border-2 border-blue-500 pointer-events-none opacity-20" />
        )}
      </div>
      
      {error && (
        <p className="text-red-400 text-sm flex items-center space-x-1">
          <span>⚠</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default InputField;
