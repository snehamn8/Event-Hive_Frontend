import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

const AdminVideos = () => {
  const [videos, setVideos] = useState([]); // ✅ Initialized as array
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/content/videos');
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch videos');
        }

        // ✅ Ensure data is an array
        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          throw new Error('Unexpected response format');
        }

      } catch (err) {
        console.error('Error loading videos:', err);
        setError(err.message);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="admin-section">
      <h2>🎥 Manage Uploaded Videos</h2>

      {error && <p className="msg error">❌ {error}</p>}

      {videos.length === 0 ? (
        <p>No videos uploaded yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>URL</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map(video => (
              <tr key={video._id}>
                <td>{video.title}</td>
                <td><a href={video.url} target="_blank" rel="noopener noreferrer">Watch</a></td>
                <td>{video.tags?.join(', ')}</td>
                <td>
                  <button onClick={() => console.log('Delete video', video._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminVideos;
