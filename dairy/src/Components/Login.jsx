import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
 
const Login = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
   
    // Validate inputs
    if (!formData.employeeId.trim() || !formData.password) {
      setError('Employee ID and password are required');
      return;
    }
 
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find(
      user => user.employeeId === formData.employeeId && user.password === formData.password
    );
   
    if (user) {

      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/dashboard');
    } else {
      setError('Invalid Employee ID or password');
    }
  };
 
  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
       
        <div className="form-group">
          <label htmlFor="employeeId">Employee ID</label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
          />
        </div>
 
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
 
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};
 
export default Login;