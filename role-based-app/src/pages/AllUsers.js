// src/pages/AllUsers.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeader, getUser } from '../utils';
import useSWR from 'swr';

function AllUsers() {
  const [users, setUsers] = useState([]);

  const { data: u, error, isLoading } = useSWR("user", getUser);

  useEffect(() => {
    axios.get('http://localhost:5001/users', {
      withCredentials: true
    })
    .then(res => setUsers(res.data))
    .catch(() => alert('Failed to load users'));
  }, []);

  const handleRoleChange = (id, newRole) => {
    axios.patch(`http://localhost:5001/user/${id}/role`, {
      role: newRole
    }, {
      withCredentials: true
    })
    .then(() => {
      alert('Role updated');
      setUsers(prev => prev.map(user => user._id === id ? { ...user, role: newRole } : user));
    })
    .catch(() => alert('Failed to update role'));
  };

  return (
    <div>
      <h2>All Users (Admin)</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <select value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)} disabled={user.email === u.email}>
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllUsers;
