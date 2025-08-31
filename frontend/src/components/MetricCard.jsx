import PropTypes from 'prop-types';

/**
 * Metric card component for displaying statistics and progress
 * Used in dashboard and leaderboard sections
 */
const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  className = '' 
}) => {
  const getTrendColor = () => {
    if (trend > 0) return 'text-green-400';
    if (trend < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  const getTrendSymbol = () => {
    if (trend > 0) return '+';
    if (trend < 0) return '';
    return '';
  };

  return (
    <div 
      className={`
        glass rounded-xl p-6 group hover:border-cyan-500/50 
        transition-all duration-300 glow-hover
        ${className}
      `}
      role="article"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">
          {title}
        </h3>
        {Icon && (
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20">
            <Icon className="h-5 w-5 text-cyan-400" />
          </div>
        )}
      </div>

      <div className="mb-2">
        <span className="text-3xl font-bold text-white">
          {value}
        </span>
        {trend !== undefined && (
          <span className={`ml-2 text-sm font-medium ${getTrendColor()}`}>
            {getTrendSymbol()}{Math.abs(trend)}%
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-gray-400 text-sm">
          {subtitle}
        </p>
      )}
    </div>
  );
};

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.elementType,
  trend: PropTypes.number,
  className: PropTypes.string,
};

export default MetricCard;
