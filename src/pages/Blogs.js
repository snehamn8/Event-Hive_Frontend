// src/pages/Blogs.js
import React, { useEffect, useState } from 'react';
import './Blogs.css';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  // Static blog list
  const staticBlogs = [
    {
      id: 'static-1',
      title: '5 Virtual Event Trends to Watch in 2025',
      date: 'April 5, 2025',
      author: 'EventHive Team',
      excerpt:
        'Discover the key trends shaping the future of virtual events including hybrid formats, immersive VR, AI networking, and more.',
      content:
        'In 2025, virtual events are going hybrid. Expect immersive formats with VR, AI-powered matchmaking, and on-demand experiences that maximize accessibility and ROI.',
      image: '/images/blog1.png',
    },
    {
      id: 'static-2',
      title: 'How to Boost Engagement in Online Conferences',
      date: 'March 28, 2025',
      author: 'Anna Thomas',
      excerpt:
        'Interactive tools, gamification, and real-time polls can take your virtual event engagement to the next level.',
      content:
        'Boosting engagement in online conferences requires creativity—use breakout rooms, gamification, polls, Q&A tools, and rewards to encourage participation.',
      image: '/images/blog2.png',
    },
    {
      id: 'static-3',
      title: 'B2B Event Marketing: Best Practices in 2025',
      date: 'March 12, 2025',
      author: 'Daniel Rose',
      excerpt:
        'Learn how to position your virtual events for maximum brand exposure and qualified lead generation.',
      content:
        'From pre-event email campaigns to post-event retargeting, discover how to attract B2B buyers and build trust through compelling storytelling.',
      image: '/images/blog3.png',
    },
    {
      id: 'static-4',
      title: 'Why Hybrid Events Are the Future',
      date: 'February 24, 2025',
      author: 'Maya Verma',
      excerpt:
        'Hybrid events combine in-person experience with virtual access, increasing reach and ROI — here’s how.',
      content:
        'Hybrid events unlock global participation without sacrificing the energy of live gatherings. Learn how to balance the digital and physical components.',
      image: '/images/blog4.png',
    },
    {
      id: 'static-5',
      title: 'Using AI to Personalize Event Experiences',
      date: 'February 10, 2025',
      author: 'James Lee',
      excerpt:
        'AI is revolutionizing event personalization, from content recommendations to smart matchmaking.',
      content:
        'AI makes virtual events smarter. It learns preferences, suggests sessions, connects users to peers, and adapts content delivery in real time.',
      image: '/images/blog5.png',
    },
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/blogs');
        const data = await res.json();

        const dynamicBlogs = data.map((b) => ({
          id: b._id,
          title: b.title,
          date: new Date(b.createdAt).toDateString(),
          author: b.author?.name || 'Admin',
          excerpt: b.content?.slice(0, 120) + '...',
          content: b.content,
          image: b.image?.startsWith('data:image') ? b.image : '/images/blog1.png',
        }));

        setBlogs([...staticBlogs, ...dynamicBlogs]);
      } catch (err) {
        console.warn('⚠️ Failed to load blogs from backend. Using static blogs.');
        setBlogs(staticBlogs);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blogs-page">
      {/* Hero Section */}
      <section className="blogs-hero">
        <h1>📚 Insights, Strategies & Virtual Event Wisdom</h1>
        <p>
          Stay ahead of the curve with expert-written content on event tech,
          marketing, and engagement.
        </p>
      </section>

      {/* CTA Section */}
      <section className="featured-highlight">
        <div className="highlight-content">
          <h2>📈 Level Up Your Virtual Event Strategy</h2>
          <p>
            Get actionable tips on running successful, data-driven, and scalable
            virtual events for your B2B brand.
          </p>
          <Link to="/events" className="highlight-btn">
            Browse Events →
          </Link>
        </div>
        <img src="/images/blog-cta.png" alt="Highlight" />
      </section>

      {/* Blog Content */}
      <div className="blog-content-area">
        <div className="blog-list">
          {blogs.map((blog) => (
            <div className="blog-card" key={blog.id}>
              <img src={blog.image} alt={blog.title} />
              <div className="blog-details">
                <h2>{blog.title}</h2>
                <p className="blog-meta">
                  {blog.date} • By {blog.author}
                </p>
                <p className="blog-excerpt">{blog.excerpt}</p>
                <Link to={`/blogs/${blog.id}`} state={blog} className="read-more">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="blog-sidebar">
          <h3>Popular Tags</h3>
          <div className="tags">
            <span>#VirtualEvents</span>
            <span>#Marketing</span>
            <span>#Hybrid</span>
            <span>#AI</span>
            <span>#B2B</span>
            <span>#Engagement</span>
          </div>

          <div className="newsletter-box">
            <h4>📰 Join Our Newsletter</h4>
            <p>Get the latest blogs, insights, and updates every week!</p>
            <input type="email" placeholder="Your email" />
            <button>Subscribe</button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Blogs;
