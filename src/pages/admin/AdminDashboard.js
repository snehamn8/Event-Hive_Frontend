import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>👑 Admin Dashboard</h2>
      <p>Manage your platform with ease.</p>

      <div className="admin-actions">
        <Link to="/admin/events" className="admin-card">📅 Manage Events</Link>
        <Link to="/admin/blogs" className="admin-card">✍️ Manage Blogs</Link>
        <Link to="/admin/videos" className="admin-card">🎥 Manage Videos</Link>
        <Link to="/admin/users" className="admin-card">👥 Manage Users</Link>
        <Link to="/admin/events/add">➕ Add Event</Link>
        <Link to="/admin/blogs/add">➕ Add Blog</Link>
        <Link to="/admin/videos/add">➕ Add Video</Link>

      </div>
    </div>
  );
};

export default AdminDashboard;
