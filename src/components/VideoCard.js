// src/components/VideoCard.js
import React from 'react';
import './Card.css';

const VideoCard = ({ video }) => {
  return (
    <div className="card">
      <h3>{video.title}</h3>
      <iframe
        width="100%"
        height="200"
        src={video.url}
        title={video.title}
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <p><strong>Tags:</strong> {video.tags.join(', ')}</p>
    </div>
  );
};

export default VideoCard;
