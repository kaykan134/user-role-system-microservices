// src/pages/UserDashboard.js

import React from 'react';
import { getUser, logout } from '../utils';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

function UserDashboard() {
  const { data: user, error, isLoading } = useSWR("user", getUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    console.error("Error fetching user:", error);
    return <div>Error loading user information.</div>;
  }

  return (
    <div>
      <h1>Welcome User 🙋</h1>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>

      <button onClick={() => navigate('/submit-issue')}>Submit Issue</button>
      <button onClick={() => navigate('/submit-feedback')}>Submit Feedback</button>
      <br /><br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default UserDashboard;
