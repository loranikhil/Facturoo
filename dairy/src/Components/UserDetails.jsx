import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./UserDetails.css"

const UserDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    permanentAddress: '',
    aadharNumber: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [addressSame, setAddressSame] = useState(false);
  
  useEffect(() => {
    const userAuth = localStorage.getItem('userAuth');
    if (!userAuth) {
      navigate('/signup');
    }
  }, [navigate]);

  useEffect(() => {
    if (addressSame) {
      setFormData({
        ...formData,
        permanentAddress: formData.address
      });
    }
  }, [addressSame, formData.address]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleCheckboxChange = (e) => {
    setAddressSame(e.target.checked);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateAadhar = (aadhar) => {
   
    const regex = /^\d{12}$/;
    return regex.test(aadhar);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    }
    
    if (!formData.gender) {
      errors.gender = 'Please select a gender';
    }
    
    if (!formData.address.trim()) {
      errors.address = 'Current address is required';
    }
    
    if (!formData.permanentAddress.trim()) {
      errors.permanentAddress = 'Permanent address is required';
    }
    
    if (!formData.aadharNumber.trim()) {
      errors.aadharNumber = 'Aadhar number is required';
    } else if (!validateAadhar(formData.aadharNumber)) {
      errors.aadharNumber = 'Please enter a valid 12-digit Aadhar number';
    }
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    const userAuth = JSON.parse(localStorage.getItem('userAuth'));
    
    const completeUserData = {
      ...userAuth,
      ...formData
    };
    
    console.log('Registration complete:', completeUserData);

    alert('Registration successful! You can now login with your mobile number and password.');
    
    localStorage.removeItem('userAuth');

    navigate('/login');
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile__form-wrapper">
        <div className="user-profile__header">
          <h2 className="user-profile__title">Complete Your Profile</h2>
          <p className="user-profile__subtitle">Please fill in all required details to complete your registration</p>
        </div>

        <form className="user-profile__form" onSubmit={handleSubmit}>
          <div className="user-profile__form-row">
            <div className="user-profile__form-group">
              <label htmlFor="firstName" className="user-profile__label">First Name <span className="user-profile__required">*</span></label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="user-profile__input"
              />
              {formErrors.firstName && <span className="user-profile__error">{formErrors.firstName}</span>}
            </div>

            <div className="user-profile__form-group">
              <label htmlFor="lastName" className="user-profile__label">Last Name <span className="user-profile__required">*</span></label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="user-profile__input"
              />
              {formErrors.lastName && <span className="user-profile__error">{formErrors.lastName}</span>}
            </div>
          </div>

          <div className="user-profile__form-group">
            <label htmlFor="email" className="user-profile__label">Email Address <span className="user-profile__required">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
              className="user-profile__input"
            />
            {formErrors.email && <span className="user-profile__error">{formErrors.email}</span>}
          </div>

          <div className="user-profile__form-row">
            <div className="user-profile__form-group">
              <label htmlFor="dateOfBirth" className="user-profile__label">Date of Birth <span className="user-profile__required">*</span></label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="user-profile__input"
              />
              {formErrors.dateOfBirth && <span className="user-profile__error">{formErrors.dateOfBirth}</span>}
            </div>

            <div className="user-profile__form-group">
              <label htmlFor="gender" className="user-profile__label">Gender <span className="user-profile__required">*</span></label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="user-profile__select"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {formErrors.gender && <span className="user-profile__error">{formErrors.gender}</span>}
            </div>
          </div>

          <div className="user-profile__form-group">
            <label htmlFor="address" className="user-profile__label">Current Address <span className="user-profile__required">*</span></label>
            <textarea
              id="address"
              name="address"
              placeholder="Enter your current address"
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
              className="user-profile__textarea"
            ></textarea>
            {formErrors.address && <span className="user-profile__error">{formErrors.address}</span>}
          </div>

          <div className="user-profile__checkbox-group">
            <input
              type="checkbox"
              id="sameAddress"
              checked={addressSame}
              onChange={handleCheckboxChange}
              className="user-profile__checkbox"
            />
            <label htmlFor="sameAddress" className="user-profile__checkbox-label">Permanent address same as current address</label>
          </div>

          <div className="user-profile__form-group">
            <label htmlFor="permanentAddress" className="user-profile__label">Permanent Address <span className="user-profile__required">*</span></label>
            <textarea
              id="permanentAddress"
              name="permanentAddress"
              placeholder="Enter your permanent address"
              value={formData.permanentAddress}
              onChange={handleInputChange}
              rows="3"
              disabled={addressSame}
              className="user-profile__textarea"
            ></textarea>
            {formErrors.permanentAddress && <span className="user-profile__error">{formErrors.permanentAddress}</span>}
          </div>

          <div className="user-profile__form-group">
            <label htmlFor="aadharNumber" className="user-profile__label">Aadhar Number <span className="user-profile__required">*</span></label>
            <input
              type="text"
              id="aadharNumber"
              name="aadharNumber"
              placeholder="Enter your 12-digit Aadhar number"
              value={formData.aadharNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                handleInputChange({ target: { name: 'aadharNumber', value } });
              }}
              maxLength="12"
              className="user-profile__input"
            />
            {formErrors.aadharNumber && <span className="user-profile__error">{formErrors.aadharNumber}</span>}
          </div>

          <div className="user-profile__actions">
            <button type="button" className="user-profile__btn-back" onClick={() => navigate('/signup')}>
              Back
            </button>
            <button type="submit" className="user-profile__btn-submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;