import PropTypes from 'prop-types';
import { Star } from 'lucide-react';

/**
 * Testimonial card component for displaying user feedback
 * Features glassmorphism design with user avatar and rating
 */
const TestimonialCard = ({ 
  content, 
  author, 
  role, 
  company,
  rating = 5,
  avatar,
  className = '' 
}) => {
  return (
    <div 
      className={`
        glass rounded-xl p-6 group hover:border-cyan-500/50 
        transition-all duration-300 glow-hover
        ${className}
      `}
      role="article"
    >
      {/* Rating stars */}
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Testimonial content */}
      <blockquote className="text-gray-300 mb-6 leading-relaxed">
        "{content}"
      </blockquote>

      {/* Author info */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden">
          {avatar ? (
            <img 
              src={avatar} 
              alt={`${author} avatar`} 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-semibold text-lg">
              {author.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h4 className="text-white font-semibold">{author}</h4>
          <p className="text-gray-400 text-sm">
            {role} {company && `at ${company}`}
          </p>
        </div>
      </div>
    </div>
  );
};

TestimonialCard.propTypes = {
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  company: PropTypes.string,
  rating: PropTypes.number,
  avatar: PropTypes.string,
  className: PropTypes.string,
};

export default TestimonialCard;
