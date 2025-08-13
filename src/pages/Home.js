// src/pages/Home.js
import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to <span className="highlight">EventHive</span></h1>
        <p>Your virtual event destination for networking, learning, and growth.</p>
        <Link to="/events" className="cta-btn">🚀 Explore Events</Link>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h3>🎫 Easy Ticketing</h3>
          <p>Book, manage, and attend events with just a few clicks.</p>
        </div>
        <div className="feature-card">
          <h3>🤝 Networking</h3>
          <p>Connect with professionals, speakers, and attendees worldwide.</p>
        </div>
        <div className="feature-card">
          <h3>📚 Content Hub</h3>
          <p>Access blogs, videos, and expert talks from top creators.</p>
        </div>
      </section>

      {/* Popular Events Section */}
      <section className="popular-events">
        <h2>🔥 Popular Events</h2>
        <div className="event-cards">
          <div className="event-card">
            <img src="images/event1.jpg" alt="Event" />
            <h4>Tech Talks 2025</h4>
            <p>Learn about the future of AI, Blockchain, and more!</p>
            <Link to="/events">Register →</Link>
          </div>
          <div className="event-card">
            <img src="images/event2.jpg" alt="Event" />
            <h4>Marketing Mastery</h4>
            <p>Grow your brand with expert strategies and tools.</p>
            <Link to="/events">Join Now →</Link>
          </div>
          <div className="event-card">
            <img src="images/event4.jpg" alt="Event" />
            <h4>Startup Summit</h4>
            <p>Pitch your ideas and connect with investors.</p>
            <Link to="/events">Apply →</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>💬 What People Say</h2>
        <div className="testimonial-card">
          <p>"EventHive helped me attend 3 global events from my home. Incredible experience!"</p>
          <span>- Sarah, Developer</span>
        </div>
      </section>
    </div>
  );
};

export default Home;
