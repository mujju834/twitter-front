// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaHashtag, FaBell, FaEnvelope, FaUser, FaEllipsisH } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

function Sidebar() {
  const navigate = useNavigate();
  const handlePostClick = () => {
    // Navigate to the homepage
    navigate('/');
  };
  return (
    <div className="sidebar d-flex flex-column align-items-start">
      <h4 className="mb-4 ps-3">X</h4>
      <ul className="nav flex-column w-100 ps-3">
        <li className="nav-item mb-3">
          <Link to="/" className="nav-link"><FaHome className="me-2" /> Home</Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/explore" className="nav-link"><FaHashtag className="me-2" /> Explore</Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/notifications" className="nav-link"><FaBell className="me-2" /> Notifications</Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/messages" className="nav-link"><FaEnvelope className="me-2" /> Messages</Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/profile" className="nav-link"><FaUser className="me-2" /> Profile</Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/more" className="nav-link"><FaEllipsisH className="me-2" /> More</Link>
        </li>
      </ul>
      <Button
      className="mt-3 w-75 align-self-center"
      variant="primary"
      size="lg"
      onClick={handlePostClick}
    >
      Post
    </Button>
    <LogoutButton />
    </div>
  );
}

export default Sidebar;
