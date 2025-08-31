import PropTypes from 'prop-types';
import { ArrowRight } from 'lucide-react';

/**
 * Category card component for displaying different AI/ML categories
 * Shows problem count and serves as a navigation target
 */
const CategoryCard = ({ 
  icon: Icon, 
  title, 
  description, 
  problemCount, 
  color = 'blue',
  onClick,
  className = '' 
}) => {
  const colorClasses = {
    blue: 'from-blue-600/20 to-blue-800/20 hover:from-blue-600/30 hover:to-blue-800/30 border-blue-500/30',
    purple: 'from-purple-600/20 to-purple-800/20 hover:from-purple-600/30 hover:to-purple-800/30 border-purple-500/30',
    cyan: 'from-cyan-600/20 to-cyan-800/20 hover:from-cyan-600/30 hover:to-cyan-800/30 border-cyan-500/30',
    green: 'from-green-600/20 to-green-800/20 hover:from-green-600/30 hover:to-green-800/30 border-green-500/30',
  };

  const iconColors = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    cyan: 'text-cyan-400',
    green: 'text-green-400',
  };

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-6 rounded-xl border 
        bg-gradient-to-br ${colorClasses[color]}
        group hover:scale-105 transition-all duration-300 glow-hover focus-ring
        ${className}
      `}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg bg-black/30 ${iconColors[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
      </div>

      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
        {title}
      </h3>

      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
        {description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          {problemCount} Problems
        </span>
        <div className="w-16 h-1 bg-gradient-to-r from-transparent to-cyan-400/50 rounded-full" />
      </div>
    </button>
  );
};

CategoryCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  problemCount: PropTypes.number.isRequired,
  color: PropTypes.oneOf(['blue', 'purple', 'cyan', 'green']),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

CategoryCard.defaultProps = {
  color: 'blue',
  onClick: () => {},
};

export default CategoryCard;
