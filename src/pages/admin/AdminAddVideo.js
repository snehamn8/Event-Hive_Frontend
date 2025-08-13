import React, { useState } from 'react';
import './AdminForm.css';

const AdminAddVideo = () => {
  const [videoData, setVideoData] = useState({
    title: '',
    url: '',
    tags: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setVideoData({ ...videoData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      setMessage('❌ You must be logged in as admin to upload a video.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/content/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          ...videoData,
          tags: videoData.tags.split(',').map(tag => tag.trim()),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Video uploaded successfully!');
        setVideoData({ title: '', url: '', tags: '' });
      } else {
        setMessage(`❌ ${data.message || 'Upload failed'}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to upload video.');
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Upload New Video</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Video Title"
          value={videoData.title}
          onChange={handleChange}
          required
        />
        <input
          name="url"
          placeholder="YouTube or Video URL"
          value={videoData.url}
          onChange={handleChange}
          required
        />
        <input
          name="tags"
          placeholder="Tags (comma-separated)"
          value={videoData.tags}
          onChange={handleChange}
        />
        <button type="submit">Upload Video</button>
        {message && <p className="msg">{message}</p>}
      </form>
    </div>
  );
};

export default AdminAddVideo;
