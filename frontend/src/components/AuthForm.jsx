import PropTypes from 'prop-types';

/**
 * Reusable form wrapper component for authentication pages
 * Provides consistent layout and styling across all auth forms
 */
const AuthForm = ({ 
  title, 
  subtitle, 
  children, 
  onSubmit,
  className = '' 
}) => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 rotate-45 blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-500/20 to-blue-600/20 -rotate-45 blur-3xl" />
      </div>

      {/* Form Container */}
      <div className="relative max-w-md w-full space-y-8">
        {/* Glassmorphism Card */}
        <div className={`
          bg-gray-800/40 backdrop-blur-lg border border-gray-700/30
          rounded-2xl shadow-2xl shadow-blue-500/10 p-8
          ${className}
        `}>
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
              <svg 
                className="h-6 w-6 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-2">
              {title}
            </h2>
            
            {subtitle && (
              <p className="text-gray-400 text-sm">
                {subtitle}
              </p>
            )}
          </div>

          {/* Form Content */}
          <form onSubmit={onSubmit} className="mt-8 space-y-6">
            {children}
          </form>
        </div>

        {/* Footer Decorative Elements */}
        <div className="text-center">
          <p className="text-gray-500 text-xs">
            Secure authentication powered by AI Learning Platform
          </p>
        </div>
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default AuthForm;
