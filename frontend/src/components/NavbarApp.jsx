import { useState } from 'react';
import { Bell, User, Trophy, Settings, LogOut, Code2, Menu, X } from 'lucide-react';
import Button from './Button';
import PropTypes from 'prop-types';

/**
 * Authenticated app navbar for signed-in users
 * Includes user menu, notifications, and progress indicators
 */
const NavbarApp = ({ user, onLogout }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationCount] = useState(3); // Mock notification count

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

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
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="/dashboard" 
              className="text-gray-300 hover:text-white transition-colors focus-ring px-3 py-2 rounded"
            >
              Dashboard
            </a>
            <a 
              href="/problems" 
              className="text-gray-300 hover:text-white transition-colors focus-ring px-3 py-2 rounded"
            >
              Problems
            </a>
            <a 
              href="/leaderboard" 
              className="text-gray-300 hover:text-white transition-colors focus-ring px-3 py-2 rounded"
            >
              Leaderboard
            </a>
          </div>

          {/* Right side - notifications and user menu */}
          <div className="flex items-center space-x-4">
            {/* Progress indicator */}
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span>{user?.score || 1250} XP</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 focus-ring relative"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 focus-ring"
                aria-label="User menu"
                aria-expanded={isUserMenuOpen}
              >
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="hidden md:block text-sm">{user?.name || 'Developer'}</span>
              </button>

              {/* User dropdown menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-12 w-48 glass rounded-lg border border-gray-700 py-2 shadow-xl">
                  <a 
                    href="/profile" 
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 focus-ring"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </a>
                  <a 
                    href="/settings" 
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 focus-ring"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </a>
                  <hr className="my-2 border-gray-700" />
                  <button 
                    onClick={onLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 focus-ring w-full text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
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
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800/50">
            <div className="flex flex-col space-y-4">
              <a 
                href="/dashboard" 
                className="text-gray-300 hover:text-white transition-colors focus-ring px-3 py-2 rounded block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </a>
              <a 
                href="/problems" 
                className="text-gray-300 hover:text-white transition-colors focus-ring px-3 py-2 rounded block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Problems
              </a>
              <a 
                href="/leaderboard" 
                className="text-gray-300 hover:text-white transition-colors focus-ring px-3 py-2 rounded block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Leaderboard
              </a>
              <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span>{user?.score || 1250} XP</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

NavbarApp.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
  }),
  onLogout: PropTypes.func,
};

NavbarApp.defaultProps = {
  user: { name: 'Developer', score: 1250 },
  onLogout: () => console.log('Logout clicked'),
};

export default NavbarApp;
