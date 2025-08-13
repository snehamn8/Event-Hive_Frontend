// src/pages/admin/AdminAddBlog.js
import React, { useState } from 'react';
import './AdminForm.css';

const AdminAddBlog = () => {
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    tags: '',
    image: ''
  });

  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBlogData(prev => ({
          ...prev,
          image: reader.result
        }));
        setUploading(false);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.token) {
        setMessage('❌ You must be logged in to post a blog.');
        return;
      }

      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          ...blogData,
          tags: blogData.tags.split(',').map(tag => tag.trim()),
          author: user._id, // ✅ Only pass ObjectId
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('✅ Blog posted successfully!');
        setBlogData({ title: '', content: '', tags: '', image: '' });
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      setMessage('❌ Failed to post blog.');
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Add New Blog</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Blog Title"
          value={blogData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          rows={6}
          value={blogData.content}
          onChange={handleChange}
          required
        />
        <input
          name="tags"
          placeholder="Tags (comma-separated)"
          value={blogData.tags}
          onChange={handleChange}
        />

        <input type="file" accept="image/*" onChange={handleImageUpload} required />
        {uploading && <p>Uploading image preview...</p>}
        {blogData.image && (
          <img
            src={blogData.image}
            alt="Preview"
            style={{
              maxWidth: '300px',
              marginTop: '10px',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
          />
        )}

        <button type="submit">Post Blog</button>
        {message && <p className="msg">{message}</p>}
      </form>
    </div>
  );
};

export default AdminAddBlog;
