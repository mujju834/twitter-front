// src/components/LogoutButton.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';

function LogoutButton() {
  const [showModal, setShowModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Start the logout process
    setLoggingOut(true);
    localStorage.removeItem('token'); // Clear the authentication token
    setTimeout(() => {
      window.location.reload(); // Reload the page to ensure state is cleared
      navigate('/login'); // Redirect to the login page
    }, 500); // Delay to allow animation to complete
  };

  const showModalHandler = () => {
    setShowModal(true);
    setLoggingOut(false); // Reset loggingOut state whenever the modal is shown
  };

  const hideModalHandler = () => {
    setShowModal(false);
    setLoggingOut(false); // Reset loggingOut state whenever the modal is hidden
  };

  return (
    <>
      <button
        className="btn btn-outline-danger w-100 mt-3"
        onClick={showModalHandler}
      >
        Logout
      </button>

      {/* Confirmation Modal with Animation */}
      <CSSTransition
        in={showModal}
        timeout={600}
        classNames="modal-slide"
        unmountOnExit
      >
        <Modal
          show={showModal}
          onHide={hideModalHandler}
          backdrop="static"
          keyboard={false}
          centered
          className="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Logout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to logout?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={hideModalHandler}
              disabled={loggingOut} // Disable button while logging out
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleLogout}
              disabled={loggingOut} // Disable button while logging out
            >
              {loggingOut ? 'Logging Out...' : 'Logout'}
            </Button>
          </Modal.Footer>
        </Modal>
      </CSSTransition>
    </>
  );
}

export default LogoutButton;
