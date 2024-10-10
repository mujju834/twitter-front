// src/components/PostTweet.js
import React, { useState } from 'react';
import axios from 'axios';
import { Toast, ToastContainer, Spinner } from 'react-bootstrap';

function PostTweet({ onTweetPosted }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const userId = '60d21b4667d0d8992e610c85'; // Replace with the actual logged-in user's ID

  // Get the API base URL from the environment variables
  const apiBaseUrl = process.env.REACT_APP_TWEET_SERVICE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert('Tweet content cannot be empty');
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post(`${apiBaseUrl}/api/tweets`, {
        content,
        userId,
      });

      setLoading(false);
      setShowSuccess(true);

      // Update the tweet list immediately after showing the success message
      onTweetPosted(response.data.tweet);
      setContent(''); // Clear the content

      // Hide the success message after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error posting tweet:', error.response?.data || error.message);
      alert('Failed to post tweet. Please try again.');
      setLoading(false); // Stop loading if there's an error
    }
  };

  return (
    <div className="post-tweet mb-4">
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? (
            <span>
              <Spinner animation="border" size="sm" className="me-2" />
              Tweeting...
            </span>
          ) : (
            'Tweet'
          )}
        </button>
      </form>

      {/* Toast Notification for Success Message */}
      <ToastContainer position="top-center" className="p-3">
        <Toast onClose={() => setShowSuccess(false)} show={showSuccess} delay={2000} autohide>
          <Toast.Body className="text-success">Tweet posted successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default PostTweet;
