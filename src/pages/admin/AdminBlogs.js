// src/pages/admin/AdminBlogs.js
import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="admin-section">
      <h2>✍️ Manage Blogs</h2>
      <Link to="/admin/blogs/add" className="add-btn">➕ Add Blog</Link>
      <table>
        <thead>
          <tr><th>Title</th><th>Date</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {blogs.map((b) => (
            <tr key={b._id}>
              <td>{b.title}</td>
              <td>{new Date(b.createdAt).toDateString()}</td>
              <td>
                <button onClick={() => handleDelete(b._id)}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBlogs;
