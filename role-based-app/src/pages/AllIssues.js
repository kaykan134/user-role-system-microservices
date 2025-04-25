// src/pages/AllIssues.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../utils';

function AllIssues() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5002/issues', {
      withCredentials: true
    })
    .then((res) => setIssues(res.data))
    .catch((err) => {
      console.error(err);
      alert('Unauthorized or error loading issues');
    });
  }, []);

  return (
    <div>
      <h2>All Issues (Admin Only)</h2>
      <ul>
        {issues.map((issue, i) => (
          <li key={i}>{issue.title || JSON.stringify(issue)} - {issue.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default AllIssues;
