import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import './CreatePassword.css';


const CreatePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mobileNumber = location.state?.mobileNumber || '';

  const [formState, setFormState] = useState({
    password: '',
    confirmPassword: '',
    formErrors: {
      password: '',
      confirmPassword: ''
    },
    showPassword: false,
    showConfirmPassword: false
  });

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
      formErrors: {
        ...prevState.formErrors,
        [name]: ''
      }
    }));
  };

  const togglePasswordVisibility = (field) => {
    setFormState(prevState => ({
      ...prevState,
      [field === 'password' ? 'showPassword' : 'showConfirmPassword']: 
      !prevState[field === 'password' ? 'showPassword' : 'showConfirmPassword']
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    
    if (!validatePassword(formState.password)) {
      errors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
    }
    
    if (formState.password !== formState.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(errors).length > 0) {
      setFormState(prevState => ({
        ...prevState,
        formErrors: {
          ...prevState.formErrors,
          ...errors
        }
      }));
      return;
    }

    const userData = {
      mobileNumber,
      passwordHash: btoa(formState.password),
      registeredAt: new Date().toISOString()
    };

    localStorage.setItem('userAuth', JSON.stringify(userData));
    localStorage.setItem('currentUser', JSON.stringify({
      mobileNumber,
      loggedInAt: new Date().toISOString()
    }));
    
    navigate('/user-details');
  };

  return (
    
      <div className="create-password-container">
        <div className="logo-container">
          <div className="app-logo">
            <div className="go-logo">
              <div className="go-circle">
                <div className="go-seed"></div>
                <div className="go-seed seed-top-left"></div>
                <div className="go-seed seed-top-right"></div>
                <div className="go-seed seed-bottom-left"></div>
                <div className="go-seed seed-bottom-right"></div>
                <div className="go-seed seed-middle-right"></div>
                <div className="go-seed seed-middle-bottom"></div>
              </div>
            </div>
            <div className="yellow-dot small-dot"></div>
            <div className="yellow-dot large-dot"></div>
          </div>
        </div>
        
        <div className="form-wrapper">
          <div className="form-header">
            <h2>Create Password</h2>
            <p>Set up a secure password for your account</p>
          </div>

          <div className="mobile-display">
            <span className="mobile-label">Mobile Number:</span>
            <span className="mobile-number">+91 {mobileNumber}</span>
          </div>

          <form className="password-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">Create Password</label>
              <div className="password-wrapper">
                <input
                  type={formState.showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formState.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="eye-icon"
                  onClick={() => togglePasswordVisibility('password')}
                >
                  {formState.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formState.formErrors.password && (
                <span className="error">{formState.formErrors.password}</span>
              )}
              <span className="hint">
                Password must contain at least 8 characters with uppercase, lowercase, 
                number, and special character
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={formState.showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formState.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="eye-icon"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                >
                  {formState.showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formState.formErrors.confirmPassword && (
                <span className="error">{formState.formErrors.confirmPassword}</span>
              )}
            </div>

            <button type="submit" className="btn-create-password">
              Create Account
            </button>
          </form>
        </div>
      </div>
  
  );
};

export default CreatePassword;