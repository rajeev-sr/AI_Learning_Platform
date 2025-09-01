import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, CheckCircle, ArrowLeft } from 'lucide-react';
import AuthForm from '../components/AuthForm';
import InputField from '../components/InputField';
import GradientButton from '../components/GradientButton';

/**
 * Reset Password Page Component
 * Allows users to create a new password using a reset token
 */
const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(null);
  const [isResetComplete, setIsResetComplete] = useState(false);

  // Validate token on component mount
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsTokenValid(false);
        return;
      }

      try {
        // TODO: Replace with actual API call to validate token
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsTokenValid(true);
      } catch (error) {
        console.error('Token validation error:', error);
        setIsTokenValid(false);
      }
    };

    validateToken();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      console.log('Password reset data:', {
        token,
        email,
        password: formData.password,
      });
      
      // Show success state
      setIsResetComplete(true);
      
      // Redirect to sign in after 3 seconds
      setTimeout(() => {
        navigate('/signin', { 
          state: { message: 'Password reset successful! Please sign in with your new password.' }
        });
      }, 3000);
      
    } catch (error) {
      console.error('Password reset error:', error);
      setErrors({ submit: 'Failed to reset password. Please try again or request a new reset link.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state while validating token
  if (isTokenValid === null) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Validating reset link...</p>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (isTokenValid === false) {
    return (
      <AuthForm
        title="Invalid Reset Link"
        subtitle="This reset link has expired or is invalid"
        onSubmit={() => {}}
      >
        <div className="text-center space-y-6">
          {/* Error Icon */}
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-red-500/20 border border-red-500/30">
            <svg 
              className="h-8 w-8 text-red-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">
              Link Expired or Invalid
            </h3>
            <p className="text-gray-400 text-sm">
              This password reset link has expired or is no longer valid.
            </p>
          </div>

          <div className="space-y-3">
            <GradientButton
              type="button"
              variant="primary"
              size="lg"
              onClick={() => navigate('/forgot-password')}
              className="w-full"
            >
              Request New Reset Link
            </GradientButton>

            <Link
              to="/signin"
              className="inline-flex items-center text-gray-400 hover:text-gray-300 text-sm transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </AuthForm>
    );
  }

  return (
    <AuthForm
      title={isResetComplete ? "Password Updated!" : "Create New Password"}
      subtitle={isResetComplete ? "Your password has been successfully updated" : email ? `Resetting password for ${email}` : "Enter your new password below"}
      onSubmit={handleSubmit}
    >
      {!isResetComplete ? (
        <>
          {/* Form Fields */}
          <div className="space-y-4">
            {/* Password Field */}
            <div className="relative">
              <InputField
                label="New Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                placeholder="Create a strong password"
                icon={<Lock className="h-5 w-5" />}
                required
              />
              
              {/* Password Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <InputField
                label="Confirm New Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
                placeholder="Confirm your new password"
                icon={<Lock className="h-5 w-5" />}
                required
              />
              
              {/* Confirm Password Toggle */}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-300 transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Password strength:</p>
              <div className="flex space-x-1">
                <div className={`h-2 w-1/4 rounded ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-600'}`} />
                <div className={`h-2 w-1/4 rounded ${/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? 'bg-green-500' : 'bg-gray-600'}`} />
                <div className={`h-2 w-1/4 rounded ${/(?=.*\d)/.test(formData.password) ? 'bg-green-500' : 'bg-gray-600'}`} />
                <div className={`h-2 w-1/4 rounded ${/(?=.*[!@#$%^&*])/.test(formData.password) ? 'bg-green-500' : 'bg-gray-600'}`} />
              </div>
              <ul className="text-xs text-gray-500 space-y-1">
                <li className={formData.password.length >= 8 ? 'text-green-400' : ''}>
                  • At least 8 characters
                </li>
                <li className={/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? 'text-green-400' : ''}>
                  • Uppercase and lowercase letters
                </li>
                <li className={/(?=.*\d)/.test(formData.password) ? 'text-green-400' : ''}>
                  • At least one number
                </li>
                <li className={/(?=.*[!@#$%^&*])/.test(formData.password) ? 'text-green-400' : ''}>
                  • Special character (recommended)
                </li>
              </ul>
            </div>
          )}

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm text-center">
                {errors.submit}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <GradientButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              loading={isLoading}
              className="w-full"
            >
              {isLoading ? 'Updating Password...' : 'Update Password'}
            </GradientButton>
          </div>
        </>
      ) : (
        <>
          {/* Success State */}
          <div className="text-center space-y-6">
            {/* Success Icon */}
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-500/20 border border-green-500/30">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>

            {/* Success Message */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">
                Password Updated Successfully!
              </h3>
              <p className="text-gray-400 text-sm">
                Your password has been changed. You can now sign in with your new password.
              </p>
            </div>

            {/* Auto Redirect Notice */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-400 text-sm">
                Redirecting to sign in page in a few seconds...
              </p>
            </div>

            {/* Manual Sign In Button */}
            <div>
              <GradientButton
                type="button"
                variant="primary"
                size="lg"
                onClick={() => navigate('/signin')}
                className="w-full"
              >
                Sign In Now
              </GradientButton>
            </div>
          </div>
        </>
      )}

      {/* Back to Sign In (only show if not in success state) */}
      {!isResetComplete && (
        <div className="text-center">
          <Link
            to="/signin"
            className="inline-flex items-center text-gray-400 hover:text-gray-300 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Sign In
          </Link>
        </div>
      )}
    </AuthForm>
  );
};

ResetPassword.propTypes = {};

export default ResetPassword;
