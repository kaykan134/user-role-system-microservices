// src/pages/SubmitFeedback.js

import React, { useState } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../utils';

function SubmitFeedback() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5003/feedback', {
        message,
      }, {
        withCredentials: true
      });
      alert('Feedback submitted successfully');
      setMessage('');
    } catch (err) {
      console.error(err);
      alert('Error submitting feedback');
    }
  };

  return (
    <div>
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter feedback" required />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default SubmitFeedback;
