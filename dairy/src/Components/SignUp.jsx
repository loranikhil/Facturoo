import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./SignUp.css"

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    employeeId: '',
    phoneNumber: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  // Create refs for form fields
  const inputRefs = {
    fullName: useRef(null),
    employeeId: useRef(null),
    email: useRef(null),
    phoneNumber: useRef(null),
    role: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null)
  };

  const roleOptions = [
    { value: '', label: 'Select Role' },
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'employee', label: 'Employee' },
    { value: 'intern', label: 'Intern' }
  ];

  // Auto-validate fields as user types
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      // Validate only touched fields on data change
      const touchedErrors = {};
      Object.keys(touched).forEach(field => {
        if (touched[field]) {
          const error = validateField(field, formData[field]);
          if (error) touchedErrors[field] = error;
        }
      });
      setErrors(prev => ({...prev, ...touchedErrors}));
    }
  }, [formData, touched]);

  // Handle input changes with real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
 
    setTouched({
      ...touched,
      [name]: true
    });

   
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        return !value.trim() ? 'Full name is required' : '';
      case 'employeeId':
        return !value.trim() ? 'Employee ID is required' : '';
      case 'phoneNumber':
        return !value.trim() 
          ? 'Phone number is required' 
          : !/^\d{10}$/.test(value) 
            ? 'Please enter a valid 10-digit phone number' 
            : '';
      case 'email':
        return !value.trim() 
          ? 'Email is required' 
          : !/\S+@\S+\.\S+/.test(value) 
            ? 'Please enter a valid email address' 
            : '';
      case 'role':
        return !value ? 'Please select a role' : '';
      case 'password':
        return !value 
          ? 'Password is required' 
          : value.length < 6 
            ? 'Password must be at least 6 characters' 
            : '';
      case 'confirmPassword':
        return value !== formData.password ? 'Passwords do not match' : '';
      default:
        return '';
    }
  };

  const calculatePasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let score = 0;
    

    if (password.length >= 8) score += 25;
    else if (password.length >= 6) score += 10;

    if (/[A-Z]/.test(password)) score += 20; 
    if (/[a-z]/.test(password)) score += 20; 
    if (/[0-9]/.test(password)) score += 20;
    if (/[^A-Za-z0-9]/.test(password)) score += 20; 
    
    setPasswordStrength(Math.min(100, score));
  };

  const getStrengthColor = () => {
    if (passwordStrength < 30) return '#e53935'; 
    if (passwordStrength < 60) return '#ff9800'; 
    return '#43a047'; 
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
    
    
    if (name === 'email' && value && !error) {
      checkEmailUniqueness(value);
    }
  };


  const checkEmailUniqueness = (email) => {
    if (!email || !email.includes('@')) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const isEmailTaken = users.some(user => user.email === email);
    
    if (isEmailTaken) {
      setErrors(prev => ({
        ...prev,
        email: 'This email is already registered'
      }));
    }
  };


  const animateInvalidField = (fieldName) => {
    if (inputRefs[fieldName]?.current) {
      inputRefs[fieldName].current.classList.add('shake-animation');
      setTimeout(() => {
        inputRefs[fieldName].current?.classList.remove('shake-animation');
      }, 500);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const getFormCompletion = () => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(value => 
      typeof value === 'string' ? value.trim() !== '' : value !== ''
    ).length;
    return Math.round((filledFields / totalFields) * 100);
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
  
    if (!validateForm()) {
      
      const firstErrorField = Object.keys(errors).find(field => errors[field]);
      if (firstErrorField) {
        animateInvalidField(firstErrorField);
        inputRefs[firstErrorField]?.current?.focus();
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
   
      await new Promise(resolve => setTimeout(resolve, 1000));
    
      const { confirmPassword, ...userData } = formData;
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (users.some(user => user.email === userData.email)) {
        setErrors(prev => ({
          ...prev,
          email: 'This email is already registered'
        }));
        animateInvalidField('email');
        inputRefs.email?.current?.focus();
        throw new Error('Email already exists');
      }
      
      users.push({
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      });
      
      localStorage.setItem('users', JSON.stringify(users));
      
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (fieldName) => {
    const baseClass = 'form-control';
    if (!touched[fieldName]) return baseClass;
    return errors[fieldName] ? `${baseClass} error` : baseClass;
  };

  const getFieldStatus = (fieldName) => {
    if (!touched[fieldName]) return '';
    return errors[fieldName] ? 'invalid' : 'valid';
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-progress">
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${getFormCompletion()}%` }}
            ></div>
          </div>
          <span className="progress-text">{getFormCompletion()}% Complete</span>
        </div>

        <div className={`form-group ${getFieldStatus('fullName')}`}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('fullName')}
            placeholder="Enter your full name"
            disabled={isSubmitting}
            ref={inputRefs.fullName}
          />
          {errors.fullName && touched.fullName && (
            <span className="error-message">{errors.fullName}</span>
          )}
        </div>

        <div className={`form-group ${getFieldStatus('employeeId')}`}>
          <label htmlFor="employeeId">Employee ID</label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('employeeId')}
            placeholder="Enter your employee ID"
            disabled={isSubmitting}
            ref={inputRefs.employeeId}
          />
          {errors.employeeId && touched.employeeId && (
            <span className="error-message">{errors.employeeId}</span>
          )}
        </div>

        <div className={`form-group ${getFieldStatus('phoneNumber')}`}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('phoneNumber')}
            placeholder="Enter 10-digit phone number"
            disabled={isSubmitting}
            ref={inputRefs.phoneNumber}
          />
          {errors.phoneNumber && touched.phoneNumber && (
            <span className="error-message">{errors.phoneNumber}</span>
          )}
        </div>

        <div className={`form-group ${getFieldStatus('email')}`}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('email')}
            placeholder="Enter your email address"
            disabled={isSubmitting}
            ref={inputRefs.email}
          />
          {errors.email && touched.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className={`form-group ${getFieldStatus('role')}`}>
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('role')}
            disabled={isSubmitting}
            ref={inputRefs.role}
          >
            {roleOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.role && touched.role && (
            <span className="error-message">{errors.role}</span>
          )}
        </div>

        <div className={`form-group ${getFieldStatus('password')}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('password')}
            placeholder="Enter password (min. 6 characters)"
            disabled={isSubmitting}
            ref={inputRefs.password}
          />
          {formData.password && (
            <div className="password-strength">
              <div className="strength-bar">
                <div 
                  className="strength-progress" 
                  style={{ 
                    width: `${passwordStrength}%`,
                    backgroundColor: getStrengthColor()
                  }}
                ></div>
              </div>
              <span style={{ color: getStrengthColor() }}>
                {passwordStrength < 30 ? 'Weak' : passwordStrength < 60 ? 'Medium' : 'Strong'}
              </span>
            </div>
          )}
          {errors.password && touched.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <div className={`form-group ${getFieldStatus('confirmPassword')}`}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('confirmPassword')}
            placeholder="Confirm your password"
            disabled={isSubmitting}
            ref={inputRefs.confirmPassword}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        <button 
          type="submit" 
          className={isSubmitting ? 'loading' : ''}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Sign Up'}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;