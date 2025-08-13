import React, { useEffect, useState } from 'react';
import './Videos.css';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const formalVideos = [
      {
        id: 1,
        title: 'Event Hosting Tutorial For Beginners',
        videoUrl: 'https://www.youtube.com/embed/bB8yK-jDefA',
        description: 'Learn essential tips for becoming an effective event host.',
        category: 'Trending',
        likes: 150
      },
      {
        id: 2,
        title: 'How to Host Any Party Like a Pro',
        videoUrl: 'https://www.youtube.com/embed/RJ9ax8_ugFc',
        description: 'Budget-friendly tips and secrets for hosting successful events.',
        category: 'Trending',
        likes: 200
      },
      {
        id: 3,
        title: 'Hosting Tips | Emcee 101',
        videoUrl: 'https://www.youtube.com/embed/FMtX-Sx4xfQ',
        description: 'Professional advice on becoming a great event host.',
        category: 'Most Watched',
        likes: 180
      }
    ];

    setVideos(formalVideos);
  }, []);

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="videos-page">
      <h1>🎬 Featured Video</h1>
      <div className="featured-video">
        <iframe 
          src={videos[0]?.videoUrl} 
          title={videos[0]?.title} 
          frameBorder="0" 
          allowFullScreen>
        </iframe>
        <h2>{videos[0]?.title}</h2>
        <p>{videos[0]?.description}</p>
      </div>

      <h1>📺 Event Videos</h1>
      <input 
        type="text" 
        placeholder="🔍 Search videos..." 
        className="search-box"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {['Trending', 'Most Watched'].map(category => (
        <div key={category}>
          <h2>{category}</h2>
          <div className="video-grid">
            {filteredVideos.filter(video => video.category === category).map(video => (
              <div className="video-card" key={video.id}>
                <iframe src={video.videoUrl} title={video.title} frameBorder="0" allowFullScreen></iframe>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <p>❤️ {video.likes} Likes</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Videos;
