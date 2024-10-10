// src/components/RightSidebar.js
import React from 'react';
import { Button } from 'react-bootstrap';

function RightSidebar() {
  return (
    <div className="right-sidebar">
      <div className="trending-section mb-3">
        <h5>Trending in Florida</h5>
        <p className="text-muted mb-1">Cape Coral</p>
        <p className="text-muted">2,041 posts</p>
        <hr />
        <a href="#" className="text-primary">Show more</a>
      </div>
      <div className="who-to-follow-section">
        <h5>Who to follow</h5>
        <ul className="list-unstyled">
          <li className="mb-3 d-flex align-items-center justify-content-between">
            <div>
              <span className="fw-bold">Leading Report</span>
            </div>
            <Button variant="outline-primary" size="sm" className="follow-button">Follow</Button>
          </li>
          <li className="mb-3 d-flex align-items-center justify-content-between">
            <div>
              <span className="fw-bold">Narendra Modi</span>
            </div>
            <Button variant="outline-primary" size="sm" className="follow-button">Follow</Button>
          </li>
          <li className="mb-3 d-flex align-items-center justify-content-between">
            <div>
              <span className="fw-bold">Sara Rose</span>
            </div>
            <Button variant="outline-primary" size="sm" className="follow-button">Follow</Button>
          </li>
        </ul>
        <a href="#" className="text-primary">Show more</a>
      </div>
    </div>
  );
}

export default RightSidebar;
