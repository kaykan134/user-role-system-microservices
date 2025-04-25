// src/pages/AllFeedbacks.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../utils';

function AllFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5003/feedback', {
      withCredentials: true
    })
    .then((res) => setFeedbacks(res.data))
    .catch((err) => {
      console.error(err);
      alert('Unauthorized or error loading feedbacks');
    });
  }, []);

  return (
    <div>
      <h2>All Feedbacks (Admin Only)</h2>
      <ul>
        {feedbacks.map((fb, i) => (
          <li key={i}>{fb.message || JSON.stringify(fb)}</li>
        ))}
      </ul>
    </div>
  );
}

export default AllFeedbacks;
