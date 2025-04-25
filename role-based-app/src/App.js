// src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import AllUsers from './pages/AllUsers';
import AllIssues from './pages/AllIssues';
import AllFeedbacks from './pages/AllFeedbacks';
import SubmitIssue from './pages/SubmitIssue';
import SubmitFeedback from './pages/SubmitFeedback';
import ExportData from './pages/Export';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/all-issues" element={<AllIssues />} />
        <Route path="/all-feedbacks" element={<AllFeedbacks />} />
        <Route path="/submit-issue" element={<SubmitIssue />} />
        <Route path="/submit-feedback" element={<SubmitFeedback />} />
        <Route path="/export" element={<ExportData />} />
      </Routes>
    </Router>
  );
}

export default App;
