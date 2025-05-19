import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'STAFF'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Directly navigate to dashboard without authentication
    navigate('/dashboard');
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <input
              type="text"
              placeholder="Username (optional)"
              value={userData.username}
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password (optional)"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password (optional)"
              value={userData.confirmPassword}
              onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
            />
          </div>

          <div className="form-group">
            <select
              value={userData.role}
              onChange={(e) => setUserData({ ...userData, role: e.target.value })}
              className="role-select"
            >
              <option value="STAFF">Staff</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button type="submit" className="signup-button">Enter</button>
        </form>
      </div>
    </div>
  );
};

export default Signup; 