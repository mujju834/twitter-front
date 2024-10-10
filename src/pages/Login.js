// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_URL_AUTH;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/api/auth/login`, { email, password });
      // Save the token or user data to localStorage or context
      localStorage.setItem('token', response.data.token);
      // Show the success toast
      setShowSuccessToast(true);
      // Automatically redirect to homepage after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-form container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>

      <div className="mt-3">
        <p>Don't have an account?</p>
        <button onClick={handleRegisterRedirect} className="btn btn-secondary">
          Register
        </button>
      </div>

      {/* Success Toast */}
      <ToastContainer position="top-center" className="p-3">
        <Toast onClose={() => setShowSuccessToast(false)} show={showSuccessToast} delay={2000} autohide>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-success">Login successful! Redirecting...</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Login;
