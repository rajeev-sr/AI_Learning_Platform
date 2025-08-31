import { useState } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import Button from './Button';
import PropTypes from 'prop-types';

/**
 * Public navbar for landing page (non-authenticated users)
 * Responsive with mobile hamburger menu
 */
const NavbarPublic = ({ onSignIn, onSignUp }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-800/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-cyan-400" />
            <span className="text-xl font-bold gradient-text">
              CodeAI
            </span>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              className="text-gray-300 hover:text-white transition-colors focus-ring px-3 py-2 rounded"
            >
              Features
            </a>
            <a 
              href="#categories" 
              className="text-gray-300 hover:text-white transition-colors focus-ring px-3 py-2 rounded"
            >
              Categories
            </a>
            <a 
              href="#about" 
              className="text-gray-300 hover:text-white transition-colors focus-ring px-3 py-2 rounded"
            >
              About
            </a>
          </div>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={onSignIn}
              className="focus-ring"
            >
              Sign In
            </Button>
            <Button 
              variant="primary" 
              onClick={onSignUp}
              className="focus-ring"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 focus-ring"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800/50">
            <div className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="text-gray-300 hover:text-white transition-colors focus-ring px-3 py-2 rounded block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#categories" 
                className="text-gray-300 hover:text-white transition-colors focus-ring px-3 py-2 rounded block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </a>
              <a 
                href="#about" 
                className="text-gray-300 hover:text-white transition-colors focus-ring px-3 py-2 rounded block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-800/50">
                <Button 
                  variant="ghost" 
                  onClick={onSignIn}
                  className="w-full focus-ring"
                >
                  Sign In
                </Button>
                <Button 
                  variant="primary" 
                  onClick={onSignUp}
                  className="w-full focus-ring"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

NavbarPublic.propTypes = {
  onSignIn: PropTypes.func,
  onSignUp: PropTypes.func,
};

NavbarPublic.defaultProps = {
  onSignIn: () => console.log('Sign in clicked'),
  onSignUp: () => console.log('Sign up clicked'),
};

export default NavbarPublic;
