// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/custom.css';
import { Container, Row, Col, Navbar, Nav, Offcanvas, Button } from 'react-bootstrap';
import LogoutButton from './components/LogoutButton';

function App() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <Router>
      <Container fluid>
        <Row>
          {/* Navbar for mobile navigation */}
          <Navbar bg="light" expand="md" className="d-md-none">
            <Container>
              <Navbar.Brand href="#">AppName</Navbar.Brand>
              <Button variant="outline-primary" onClick={handleShow}>
                ☰ Menu
              </Button>
            </Container>
          </Navbar>

          {/* Offcanvas Sidebar for mobile */}
          <Offcanvas show={showOffcanvas} onHide={handleClose} className="d-md-none">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Navigation</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/" onClick={handleClose}>Home</Nav.Link>
                <Nav.Link as={Link} to="/explore" onClick={handleClose}>Explore</Nav.Link>
                <Nav.Link as={Link} to="/notifications" onClick={handleClose}>Notifications</Nav.Link>
                <Nav.Link as={Link} to="/messages" onClick={handleClose}>Messages</Nav.Link>
                <Nav.Link as={Link} to="/profile" onClick={handleClose}>Profile</Nav.Link>
                <Nav.Link as={Link} to="/more" onClick={handleClose}>More</Nav.Link>
                <LogoutButton />
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>

          {/* Sidebar: Hidden on mobile, visible on md and above */}
          <Col xs={12} md={3} className="d-none d-md-block">
            <Sidebar />
          </Col>

          {/* Main Content: Full width on mobile, centered on larger screens */}
          <Col xs={12} md={6} className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              {/* Add more protected routes here */}
              <Route
                path="/explore"
                element={
                  <ProtectedRoute>
                    <div>Explore Page</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <div>Notifications Page</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/messages"
                element={
                  <ProtectedRoute>
                    <div>Messages Page</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/more"
                element={
                  <ProtectedRoute>
                    <div>More Page</div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Col>

          {/* Right Sidebar: Hidden on mobile, visible on md and above */}
          <Col xs={12} md={3} className="d-none d-md-block">
            <RightSidebar />
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
