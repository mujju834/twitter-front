// src/components/TweetCard.js
import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

function TweetCard({ tweet }) {
  return (
    <Card className="tweet-card mb-3 shadow-sm border-0">
      <Card.Body>
        <Row className="align-items-center mb-3">
          <Col xs="auto">
            <img
              src={tweet.userProfile || 'https://via.placeholder.com/50'}
              alt="User"
              className="rounded-circle"
              width="50"
              height="50"
            />
          </Col>
          <Col>
            <div className="d-flex flex-column">
              <strong>{tweet.userName}</strong>
              <span className="text-muted">@{tweet.userHandle}</span>
            </div>
          </Col>
        </Row>
        <Card.Text className="mb-2">
          {tweet.content}
        </Card.Text>
        {tweet.media && (
          <img
            src={tweet.media}
            alt="Tweet media"
            className="img-fluid rounded mt-2"
          />
        )}
        <div className="d-flex justify-content-between mt-3">
          <Button variant="outline-secondary" size="sm" className="me-2">
            👍 {tweet.likes || 0}
          </Button>
          <Button variant="outline-secondary" size="sm" className="me-2">
            💬 {tweet.comments || 0}
          </Button>
          <Button variant="outline-secondary" size="sm">
            🔄 {tweet.retweets || 0}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TweetCard;
