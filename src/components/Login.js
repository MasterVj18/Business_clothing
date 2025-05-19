import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Directly navigate to dashboard without authentication
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <input
              type="text"
              placeholder="Username (optional)"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password (optional)"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>
          <button type="submit" className="login-button">Enter</button>
        </form>
      </div>
    </div>
  );
};

export default Login; 