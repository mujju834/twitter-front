// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_URL_AUTH;

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/api/auth/register`, { name, email, password });
      // Show the success toast
      setShowSuccessToast(true);
      // Automatically redirect to login page after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="register-form container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="btn btn-primary">Register</button>
      </form>

      <div className="mt-3">
        <p>Already have an account?</p>
        <button onClick={handleLoginRedirect} className="btn btn-secondary">
          Login
        </button>
      </div>

      {/* Success Toast */}
      <ToastContainer position="top-center" className="p-3">
        <Toast onClose={() => setShowSuccessToast(false)} show={showSuccessToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-success">Registration successful! Redirecting to login...</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Register;
