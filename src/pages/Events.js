import React, { useEffect, useState } from 'react';
import './Events.css';
import { Link } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);

  const staticEvents = [
    {
      id: 1,
      title: 'Tech Trends 2025',
      date: 'May 20, 2025',
      time: '10:00 AM',
      location: 'Online',
      description: 'Explore emerging technologies and their business impact.',
      image: '/images/event1.jpg',
    },
    {
      id: 2,
      title: 'Marketing Summit',
      date: 'June 10, 2025',
      time: '2:00 PM',
      location: 'Virtual Stage A',
      description: 'Master marketing strategies for B2B growth.',
      image: '/images/event2.jpg',
    },
    {
      id: 3,
      title: 'AI & Innovation Forum',
      date: 'July 15, 2025',
      time: '4:00 PM',
      location: 'Webinar',
      description: 'Discover how AI is transforming industries.',
      image: '/images/event3.jpg',
    },
    {
      id: 4,
      title: 'Startup Founders Connect',
      date: 'August 1, 2025',
      time: '6:00 PM',
      location: 'Virtual Lounge',
      description: 'Network with startup founders and investors.',
      image: '/images/event4.jpg',
    },
    {
      id: 5,
      title: 'Future of SaaS Conference',
      date: 'September 5, 2025',
      time: '11:00 AM',
      location: 'Online Broadcast',
      description: 'Deep dive into SaaS growth, retention, and monetization trends.',
      image: '/images/event5.jpg'
    },
    {
      id: 6,
      title: 'Virtual Reality Expo 2025',
      date: 'October 12, 2025',
      time: '3:00 PM',
      location: 'Virtual Reality Hub',
      description: 'Experience cutting-edge VR demos and interactive sessions.',
      image: '/images/event6.jpg'
    }
  ];

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events');
      const data = await response.json();
      setEvents([...staticEvents, ...data]);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents(staticEvents);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="events-page">
      {/* Hero / Intro Section */}
      <section className="event-hero">
        <h1>Virtual Events that Inspire Growth</h1>
        <p>
          Explore thought leadership, innovation, and real networking from anywhere in the world.
        </p>
        <Link to="/blogs" className="cta-explore">Read Industry Insights →</Link>
      </section>

      {/* Featured Events Section */}
      <section className="event-grid">
        <h2 className="section-heading">🔥 Featured Events</h2>
        {events.map((event) => (
          <div className="event-card" key={event._id || event.id}>
            <div className="event-image">
              <img
                src={
                  event.image?.startsWith('data:image')
                    ? event.image
                    : event.image?.startsWith('/images')
                    ? event.image
                    : `/images/${event.image}`
                }
                alt={event.title}
              />
            </div>
            <div className="event-content">
              <h2>{event.title}</h2>
              <p className="event-meta">
                📅 {event.date} &nbsp;&nbsp; 🕒 {event.time}
              </p>
              <p className="event-location">📍 {event.location}</p>
              <p className="event-desc">{event.description}</p>
              <div className="event-actions">
                <Link to={`/events/${event._id || event.id}`} className="details-btn">
                  View Details
                </Link>
                <Link to={`/events/${event._id || event.id}/register`} className="register-btn">
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Speaker Highlights Section */}
      <section className="speakers-section">
        <h2 className="section-heading">🎤 Keynote Speakers</h2>
        <div className="speakers-grid">
          {[
            { name: 'Sarah Collins', title: 'AI Evangelist', img: '/images/speaker1.jpg' },
            { name: 'Ravi Mehra', title: 'Marketing Guru', img: '/images/speaker2.jpeg' },
            { name: 'Linda Chan', title: 'Startup Coach', img: '/images/speaker3.jpg' },
          ].map((speaker, index) => (
            <div className="speaker-card" key={index}>
              <img src={speaker.img} alt={speaker.name} />
              <h3>{speaker.name}</h3>
              <p>{speaker.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tags Section */}
      <section className="tags-section">
        <h2 className="section-heading">📚 Explore by Category</h2>
        <div className="tag-list">
          <span className="tag">Technology</span>
          <span className="tag">Marketing</span>
          <span className="tag">Startups</span>
          <span className="tag">Webinars</span>
          <span className="tag">Networking</span>
          <span className="tag">AI</span>
        </div>
      </section>
    </div>
  );
};

export default Events;
