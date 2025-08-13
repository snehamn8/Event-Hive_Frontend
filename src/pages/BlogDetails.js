// src/pages/BlogDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogDetails.css';

const staticBlogs = [
  {
    id: 'static-1',
    title: '5 Virtual Event Trends to Watch in 2025',
    date: 'April 5, 2025',
    author: 'EventHive Team',
    content: `In 2025, virtual events are going hybrid. Expect immersive formats with VR, AI-powered matchmaking, and on-demand experiences that maximize accessibility and ROI.`,
    image: '/images/blog1.png',
  },
  {
    id: 'static-2',
    title: 'How to Boost Engagement in Online Conferences',
    date: 'March 28, 2025',
    author: 'Anna Thomas',
    content: `Boosting engagement in online conferences requires creativity—use breakout rooms, gamification, polls, Q&A tools, and rewards to encourage participation.`,
    image: '/images/blog2.png',
  },
  {
    id: 'static-3',
    title: 'B2B Event Marketing: Best Practices in 2025',
    date: 'March 12, 2025',
    author: 'Daniel Rose',
    content: `From pre-event email campaigns to post-event retargeting, discover how to attract B2B buyers and build trust through compelling storytelling.`,
    image: '/images/blog3.png',
  },
  {
    id: 'static-4',
    title: 'Why Hybrid Events Are the Future',
    date: 'February 24, 2025',
    author: 'Maya Verma',
    content: `Hybrid events unlock global participation without sacrificing the energy of live gatherings. Learn how to balance the digital and physical components.`,
    image: '/images/blog4.png',
  },
  {
    id: 'static-5',
    title: 'Using AI to Personalize Event Experiences',
    date: 'February 10, 2025',
    author: 'James Lee',
    content: `AI makes virtual events smarter. It learns preferences, suggests sessions, connects users to peers, and adapts content delivery in real time.`,
    image: '/images/blog5.png',
  },
];

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBlog = async () => {
      if (id.startsWith('static-')) {
        const match = staticBlogs.find((b) => b.id === id);
        if (match) {
          setBlog(match);
        } else {
          setError('Blog not found.');
        }
      } else {
        try {
          const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
          const data = await res.json();
          if (res.ok) {
            setBlog(data);
          } else {
            setError('Blog not found.');
          }
        } catch (err) {
          setError('Failed to load blog.');
        }
      }
    };

    loadBlog();
  }, [id]);

  if (error) return <div className="blog-details"><p>{error}</p></div>;
  if (!blog) return <div className="blog-details"><p>Loading...</p></div>;

  return (
    <div className="blog-details">
      <h1>{blog.title}</h1>
      <p className="meta">
        {blog.date || new Date(blog.createdAt).toDateString()} • {typeof blog.author === 'string' ? blog.author : blog.author?.name || 'Admin'}
      </p>
      {blog.image && <img src={blog.image} alt={blog.title} className="blog-img" />}
      <div className="content">
        {blog.content || 'No content available.'}
      </div>
    </div>
  );
};

export default BlogDetails;
