import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "./LoginForm.css"

function LoginForm() {
  const [loginData, setLoginData] = useState({
    employeeId: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setErrorMessage('');

    const staffMembers = JSON.parse(localStorage.getItem('staffMembers')) || [];
    const staffMember = staffMembers.find(
      (member) => member.employeeId === loginData.employeeId && member.password === loginData.password
    );

    if (staffMember) {
      alert('Login successful');
      navigate('/orders'); 
    } else {
      setErrorMessage('Invalid Employee ID or Password');
    }

    setIsLoggingIn(false);
  };

  return (
    <div className="login-form-container">
      <h2 className="form-header">Login</h2>
      
      {errorMessage && <div className="alert alert-error">{errorMessage}</div>}

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label className="form-label" htmlFor="employeeId">
            Employee ID
          </label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            value={loginData.employeeId}
            onChange={handleChange}
            className="form-input"
            placeholder="Employee ID"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Password"
            required
          />
        </div>

        <button type="submit" className="submit-button" disabled={isLoggingIn}>
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
