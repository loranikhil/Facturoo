import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function StaffEntryForm({ onStaffAdded }) {
  const [formData, setFormData] = useState({
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
    }
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    // Phone validation (basic)
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
      // Generate unique ID and prepare data
      const workingHours = `${formData.startTime} - ${formData.endTime}`;

      const workingDaysArray = Object.entries(formData.workingDays)
        .filter(([_, isWorking]) => isWorking)
        .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1));
      
      const staffMember = {
        id: uuidv4(),
        ...formData,
        workingHours,
        workingDaysArray,
        createdAt: new Date().toISOString()
      };
      
      // Save to localStorage
      const existingStaff = JSON.parse(localStorage.getItem('staffMembers')) || [];
      localStorage.setItem('staffMembers', JSON.stringify([...existingStaff, staffMember]));
      
      // Send to parent component (Admin.jsx) if available
      if (typeof onStaffAdded === 'function') {
        onStaffAdded(staffMember);
      }
      
      // Reset form
      setFormData({
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
        }
      });
      
      setSuccessMessage('Staff member added successfully!');
      setErrorMessage('');
      
      // Auto-hide success message after 3 seconds
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

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto my-8 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-4">Add New Staff Member</h2>
      
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-4 flex items-center shadow-sm animate-fade-in">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4 flex items-center shadow-sm animate-fade-in">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errorMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Personal Information</h3>
            <div className="border-b border-gray-200 mb-4"></div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium" htmlFor="name">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium" htmlFor="phoneNumber">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="1234567890"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium" htmlFor="email">
              Email ID <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="john.doe@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="server">Server</option>
              <option value="chef">Chef</option>
              <option value="worker">Worker</option>
              <option value="manager">Manager</option>
              <option value="host">Host/Hostess</option>
            </select>
          </div>
          
          {/* Working Hours */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Working Schedule</h3>
            <div className="border-b border-gray-200 mb-4"></div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium mb-2">
              Working Hours
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              <span className="text-gray-500">to</span>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium" htmlFor="shift">
              Shift Type
            </label>
            <select
              id="shift"
              name="shift"
              value={formData.shift}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="day">Day Shift</option>
              <option value="night">Night Shift</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
          
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-3">
              Working Days
            </label>
            <div className="grid grid-cols-3 gap-4">
              {Object.keys(formData.workingDays).map((day) => (
                <label key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={`day-${day}`}
                    checked={formData.workingDays[day]}
                    onChange={handleChange}
                    className="form-checkbox text-blue-600"
                  />
                  <span className="text-gray-700 capitalize">{day}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Banking & Documents */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Banking & Documents</h3>
            <div className="border-b border-gray-200 mb-4"></div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium" htmlFor="accountNumber">
              Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="1234567890"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium" htmlFor="panCard">
              PAN Card Number
            </label>
            <input
              type="text"
              id="panCard"
              name="panCard"
              value={formData.panCard}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="ABCDE1234F"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Staff'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default StaffEntryForm;
