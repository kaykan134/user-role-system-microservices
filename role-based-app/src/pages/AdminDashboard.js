import React, { useEffect } from 'react';
import { logout, getUser } from '../utils';
import { useNavigate } from 'react-router-dom';
import useSWR from "swr";
import axios from 'axios'; // Make sure axios is imported here or globally

function AdminDashboard() {
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
      <h1>Welcome Admin 👑</h1>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      
      <button onClick={() => navigate('/all-users')}>Manage Users</button>
      <button onClick={() => navigate('/all-issues')}>View All Issues</button>
      <button onClick={() => navigate('/all-feedbacks')}>View All Feedbacks</button>
      <button onClick={() => navigate('/export')}>Export Data</button>
      <br /><br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;