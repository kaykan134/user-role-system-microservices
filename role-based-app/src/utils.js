// src/utils.js
import axios from "axios"

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = async () => {
  const user = await axios.get("http://localhost:5000/api/auth/session", {
    withCredentials: true
  })
  return user.data
};

export const getAuthHeader = () => {
  const user = getUser();
  return user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
};

export const logout = () => {
  localStorage.removeItem('user');
};
