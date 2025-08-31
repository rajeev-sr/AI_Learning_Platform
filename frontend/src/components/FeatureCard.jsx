import PropTypes from 'prop-types';

/**
 * Feature card component with glassmorphism styling
 * Used in the features grid on the landing page
 */
const FeatureCard = ({ icon: Icon, title, description, className = '' }) => {
  return (
    <div 
      className={`
        glass rounded-xl p-6 group hover:border-blue-500/50 
        transition-all duration-300 glow-hover
        ${className}
      `}
      role="article"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all duration-300">
          <Icon className="h-6 w-6 text-cyan-400" />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

FeatureCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default FeatureCard;
