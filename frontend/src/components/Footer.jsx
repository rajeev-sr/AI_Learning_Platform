import { Code2, Github, Twitter, Linkedin } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * Footer component for the landing page
 * Contains links, social media, and company information
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/30 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Code2 className="h-8 w-8 text-cyan-400" />
              <span className="text-xl font-bold gradient-text">
                CodeAI
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Master AI problem-solving with our comprehensive platform. 
              Practice machine learning, deep learning, and generative AI challenges.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                className="text-gray-400 hover:text-white transition-colors focus-ring p-2 rounded"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                className="text-gray-400 hover:text-white transition-colors focus-ring p-2 rounded"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                className="text-gray-400 hover:text-white transition-colors focus-ring p-2 rounded"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#problems" 
                  className="text-gray-400 hover:text-white transition-colors focus-ring block py-1"
                >
                  Problem Sets
                </a>
              </li>
              <li>
                <a 
                  href="#leaderboard" 
                  className="text-gray-400 hover:text-white transition-colors focus-ring block py-1"
                >
                  Leaderboard
                </a>
              </li>
              <li>
                <a 
                  href="#tutorials" 
                  className="text-gray-400 hover:text-white transition-colors focus-ring block py-1"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a 
                  href="#community" 
                  className="text-gray-400 hover:text-white transition-colors focus-ring block py-1"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#about" 
                  className="text-gray-400 hover:text-white transition-colors focus-ring block py-1"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#careers" 
                  className="text-gray-400 hover:text-white transition-colors focus-ring block py-1"
                >
                  Careers
                </a>
              </li>
              <li>
                <a 
                  href="#privacy" 
                  className="text-gray-400 hover:text-white transition-colors focus-ring block py-1"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#terms" 
                  className="text-gray-400 hover:text-white transition-colors focus-ring block py-1"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} CodeAI. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a 
              href="#status" 
              className="text-gray-400 hover:text-white transition-colors text-sm focus-ring px-2 py-1 rounded"
            >
              Status
            </a>
            <a 
              href="#api" 
              className="text-gray-400 hover:text-white transition-colors text-sm focus-ring px-2 py-1 rounded"
            >
              API Docs
            </a>
            <a 
              href="#support" 
              className="text-gray-400 hover:text-white transition-colors text-sm focus-ring px-2 py-1 rounded"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func,
};

export default Footer;
