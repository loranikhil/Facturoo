import React, { useState } from 'react';
import './Support.css';

const Support = () => {
  const [formData, setFormData] = useState({
    issueType: '',
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.issueType) newErrors.issueType = 'Please select an issue type';
    if (!formData.fullName) newErrors.fullName = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message) newErrors.message = 'Message is required';
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
   
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
   
    setSubmitStatus('submitting');
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({
        issueType: '',
        fullName: '',
        email: '',
        phone: '',
        message: ''
      });
   
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1000);
  };

  return (
    <div className="zmt-support-container">
      <div className="zmt-hero-banner">
        <h1 className="zmt-hero-title">We would love to hear from you!</h1>
      </div>
      
      <div className="zmt-content-wrapper">
        <div className="zmt-main-content">
          <div className="zmt-form-container">
            <h2 className="zmt-form-heading">Contact Us</h2>
            <p className="zmt-form-description">Fill out the form below and we'll get back to you as soon as possible.</p>
            
            {submitStatus === 'success' && (
              <div className="zmt-success-message">
                Thank you for reaching out! We've received your message and will respond shortly.
              </div>
            )}
            
            <form className="zmt-contact-form" onSubmit={handleSubmit}>
              <div className="zmt-form-group">
                <label className="zmt-form-label" htmlFor="issueType">How can we help you?*</label>
                <select 
                  id="issueType" 
                  name="issueType" 
                  className={errors.issueType ? 'zmt-form-select zmt-input-error' : 'zmt-form-select'}
                  value={formData.issueType}
                  onChange={handleChange}
                  disabled={submitStatus === 'submitting'}
                >
                  <option value="">Select an option</option>
                  <option value="order">Order Issue</option>
                  <option value="account">Account Problem</option>
                  <option value="payment">Payment Issue</option>
                  <option value="refund">Refund Request</option>
                  <option value="feedback">General Feedback</option>
                  <option value="bug">Website/App Bug</option>
                  <option value="other">Other</option>
                </select>
                {errors.issueType && <span className="zmt-error-message">{errors.issueType}</span>}
              </div>
              
              <div className="zmt-form-group">
                <label className="zmt-form-label" htmlFor="fullName">Full Name*</label>
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName" 
                  placeholder="Enter your full name"
                  className={errors.fullName ? 'zmt-form-input zmt-input-error' : 'zmt-form-input'}
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={submitStatus === 'submitting'}
                />
                {errors.fullName && <span className="zmt-error-message">{errors.fullName}</span>}
              </div>
              
              <div className="zmt-form-group">
                <label className="zmt-form-label" htmlFor="email">Email Address*</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Enter your email address"
                  className={errors.email ? 'zmt-form-input zmt-input-error' : 'zmt-form-input'}
                  value={formData.email}
                  onChange={handleChange}
                  disabled={submitStatus === 'submitting'}
                />
                {errors.email && <span className="zmt-error-message">{errors.email}</span>}
              </div>
              
              <div className="zmt-form-group">
                <label className="zmt-form-label" htmlFor="phone">Mobile Number (optional)</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  placeholder="Enter your mobile number"
                  className="zmt-form-input"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={submitStatus === 'submitting'}
                />
              </div>
              
              <div className="zmt-form-group">
                <label className="zmt-form-label" htmlFor="message">Message*</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4" 
                  placeholder="Please describe your issue or feedback"
                  className={errors.message ? 'zmt-form-textarea zmt-input-error' : 'zmt-form-textarea'}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={submitStatus === 'submitting'}
                ></textarea>
                {errors.message && <span className="zmt-error-message">{errors.message}</span>}
              </div>
              
              <button 
                type="submit" 
                className="zmt-submit-button"
                disabled={submitStatus === 'submitting'}
              >
                {submitStatus === 'submitting' ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
        
        <div className="zmt-sidebar">
          <div className="zmt-help-section zmt-safety-section">
            <h2 className="zmt-section-heading">Report a Safety Emergency</h2>
            <p className="zmt-section-text">We are committed to the safety of everyone using Facturo.</p>
            <a href="#" className="zmt-action-link">Report here</a>
          </div>
          
          {/* <div className="zmt-help-section zmt-order-section">
            <h2 className="zmt-section-heading">Issue with your live order?</h2>
            <p className="zmt-section-text">
              Click on the 'Support' or 'Online ordering help' section in your app to connect 
              to our customer support team for immediate assistance.
            </p>
            <a href="#" className="zmt-app-button">Download App</a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Support;