import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./StaffEntryForm.css";

function StaffEntryForm({ onStaffAdded }) {
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    phoneNumber: '',
    email: '',
    startTime: '09:00',
    endTime: '17:00',
    shift: 'day',
    role: 'server',
    accountNumber: '',
    panCard: '',
    workingDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    password: '' // New field for password
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to generate the next employee ID
  const generateEmployeeId = () => {
    const existingStaff = JSON.parse(localStorage.getItem('staffMembers')) || [];
    const employeeCount = existingStaff.length + 1;
    return `Facturo${String(employeeCount).padStart(2, '0')}`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('day-')) {
      const day = name.replace('day-', '');
      setFormData(prevState => ({
        ...prevState,
        workingDays: {
          ...prevState.workingDays,
          [day]: checked
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.phoneNumber.trim()) errors.push('Phone number is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.password.trim()) errors.push('Password is required');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }

    const phoneRegex = /^\d{10}$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber.replace(/\D/g, ''))) {
      errors.push('Please enter a valid 10-digit phone number');
    }

    if (errors.length > 0) {
      setErrorMessage(errors.join('. '));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSuccessMessage('');
      return;
    }

    setIsSubmitting(true);

    try {
      const workingHours = `${formData.startTime} - ${formData.endTime}`;

      const workingDaysArray = Object.entries(formData.workingDays)
        .filter(([_, isWorking]) => isWorking)
        .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1));

      const staffMember = {
        id: uuidv4(),
        employeeId: formData.employeeId, // Employee ID
        ...formData,
        workingHours,
        workingDaysArray,
        createdAt: new Date().toISOString()
      };

      const existingStaff = JSON.parse(localStorage.getItem('staffMembers')) || [];
      localStorage.setItem('staffMembers', JSON.stringify([...existingStaff, staffMember]));

      if (typeof onStaffAdded === 'function') {
        onStaffAdded(staffMember);
      }

      setFormData({
        employeeId: generateEmployeeId(),
        name: '',
        phoneNumber: '',
        email: '',
        startTime: '09:00',
        endTime: '17:00',
        shift: 'day',
        role: 'server',
        accountNumber: '',
        panCard: '',
        workingDays: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false
        },
        password: '' // Reset password field
      });

      setSuccessMessage('Staff member added successfully!');
      setErrorMessage('');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

    } catch (error) {
      setErrorMessage('An error occurred while saving the staff member.');
      console.error('Error saving staff member:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Initialize Employee ID when the component is mounted
  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      employeeId: generateEmployeeId()
    }));
  }, []);

  return (
    <div className="staff-form-container">
      <h2 className="form-header">Add New Staff Member</h2>
      
      {successMessage && (
        <div className="alert alert-success">
          <svg className="alert-icon" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="alert alert-error">
          <svg className="alert-icon" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errorMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="col-span-2">
            <h3 className="section-header">Personal Information</h3>
            <div className="section-divider"></div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Full Name <span className="required-indicator">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Full Name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="employeeId">
              Employee ID <span className="required-indicator">*</span>
            </label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              value={formData.employeeId} // Employee ID from state
              readOnly
              className="form-input"
              placeholder="Auto-generated Employee ID"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="phoneNumber">
              Phone Number <span className="required-indicator">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="form-input"
              placeholder="Phone Number"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email ID <span className="required-indicator">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="***@example.com"
              required
            />
          </div>
          
          {/* Password Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password <span className="required-indicator">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter Password"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input form-select"
            >
              <option value="server">Server</option>
              <option value="chef">Chef</option>
              <option value="worker">Worker</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          
          {/* Working Hours */}
          <div className="col-span-2">
            <h3 className="section-header">Working Schedule</h3>
            <div className="section-divider"></div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Working Hours
            </label>
            <div className="hours-container">
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="form-input time-input"
              />
              <span className="time-separator">to</span>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="form-input time-input"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="shift">
              Shift Type
            </label>
            <select
              id="shift"
              name="shift"
              value={formData.shift}
              onChange={handleChange}
              className="form-input form-select"
            >
              <option value="day">Day Shift</option>
              <option value="night">Night Shift</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
          
          <div className="col-span-2">
            <label className="form-label">
              Working Days
            </label>
            <div className="checkbox-container">
              {Object.keys(formData.workingDays).map((day) => (
                <label key={day} className="checkbox-label">
                  <input
                    type="checkbox"
                    name={`day-${day}`}
                    checked={formData.workingDays[day]}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text capitalize">{day}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <h3 className="section-header">Banking & Documents</h3>
            <div className="section-divider"></div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="accountNumber">
              Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="form-input"
              placeholder="1234567890"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="panCard">
              PAN Card Number
            </label>
            <input
              type="text"
              id="panCard"
              name="panCard"
              value={formData.panCard}
              onChange={handleChange}
              className="form-input"
              placeholder="ABCDE1234F"
            />
          </div>
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Staff'}
        </button>
      </form>
    </div>
  );
}

export default StaffEntryForm;
