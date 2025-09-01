import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import AuthForm from '../components/AuthForm';
import InputField from '../components/InputField';
import GradientButton from '../components/GradientButton';

/**
 * Forgot Password Page Component
 * Allows users to request a password reset via email
 */
const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

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

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
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
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      console.log('Password reset requested for:', formData.email);
      
      // Show success state
      setIsEmailSent(true);
      
    } catch (error) {
      console.error('Password reset error:', error);
      setErrors({ submit: 'Failed to send reset email. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Reset email resent to:', formData.email);
    } catch (error) {
      console.error('Resend error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      title="Reset Password"
      subtitle={isEmailSent ? "Check your email for reset instructions" : "Enter your email to receive reset instructions"}
      onSubmit={handleSubmit}
    >
      {!isEmailSent ? (
        <>
          {/* Email Input */}
          <div className="space-y-4">
            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              placeholder="Enter your registered email"
              icon={<Mail className="h-5 w-5" />}
              required
            />
          </div>

          {/* Instructions */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-blue-400 text-sm">
              We&apos;ll send you a secure link to reset your password to the email address above.
            </p>
          </div>

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
              {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
            </GradientButton>
          </div>
        </>
      ) : (
        <>
          {/* Success State */}
          <div className="text-center space-y-6">
            {/* Success Icon */}
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-500/20 border border-green-500/30">
              <svg 
                className="h-8 w-8 text-green-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>

            {/* Success Message */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">
                Reset Link Sent!
              </h3>
              <p className="text-gray-400 text-sm">
                We&apos;ve sent a password reset link to
              </p>
              <p className="text-blue-400 font-medium">
                {formData.email}
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-gray-800/50 border border-gray-700/30 rounded-lg p-4 text-left">
              <h4 className="text-white font-medium mb-2">Next steps:</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Check your email inbox</li>
                <li>• Click the reset link (expires in 1 hour)</li>
                <li>• Create a new password</li>
                <li>• Sign in with your new password</li>
              </ul>
            </div>

            {/* Resend Button */}
            <div className="space-y-3">
              <GradientButton
                type="button"
                variant="secondary"
                size="md"
                onClick={handleResend}
                disabled={isLoading}
                loading={isLoading}
                className="w-full"
              >
                {isLoading ? 'Resending...' : 'Resend Email'}
              </GradientButton>

              <p className="text-gray-500 text-xs">
                Didn&apos;t receive the email? Check your spam folder or try resending.
              </p>
            </div>
          </div>
        </>
      )}

      {/* Back to Sign In */}
      <div className="text-center">
        <Link
          to="/signin"
          className="inline-flex items-center text-gray-400 hover:text-gray-300 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Sign In
        </Link>
      </div>
    </AuthForm>
  );
};

ForgotPassword.propTypes = {};

export default ForgotPassword;
