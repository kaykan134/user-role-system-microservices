// src/pages/SubmitIssue.js

import React, { useState } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../utils';

function SubmitIssue() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5002/issues', {
        title,
        description,
      }, {
        withCredentials: true
      });
      alert('Issue submitted successfully');
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err);
      alert('Error submitting issue');
    }
  };

  return (
    <div>
      <h2>Submit Issue</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        <button type="submit">Submit Issue</button>
      </form>
    </div>
  );
}

export default SubmitIssue;
