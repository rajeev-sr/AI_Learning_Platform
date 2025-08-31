import PropTypes from 'prop-types';

/**
 * Reusable Button component with consistent styling across variants
 * Supports primary (gradient), secondary (outline), and ghost variants
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-200 focus-ring disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-600 to-purple-600 text-white
      hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/25
      active:scale-95
    `,
    secondary: `
      border border-gray-600 text-gray-100 glass
      hover:border-blue-400 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/25
      active:scale-95
    `,
    ghost: `
      text-gray-300 hover:text-white hover:bg-white/5
      active:scale-95
    `,
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
