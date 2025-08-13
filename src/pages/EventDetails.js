import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './EventDetails.css';

const staticEvents = [
  {
    id: 1,
    title: 'Tech Trends 2025',
    date: 'May 20, 2025',
    time: '10:00 AM',
    location: 'Online',
    description: `Join us for an in-depth exploration of the cutting-edge technologies shaping 2025. 
    From artificial intelligence and blockchain to quantum computing and immersive experiences, 
    this event brings together top tech leaders to discuss what's next. Discover how emerging 
    tech is transforming industries, driving innovation, and changing the way we work and live. 
    Gain insights, ask questions, and network with visionaries from around the globe.`,
    image: '/images/event1.jpg',
  },
  {
    id: 2,
    title: 'Marketing Summit',
    date: 'June 10, 2025',
    time: '2:00 PM',
    location: 'Virtual Stage A',
    description: `The Marketing Summit 2025 is your front-row ticket to the future of brand strategy. 
    Learn how to create high-converting campaigns, leverage influencer partnerships, and scale your 
    B2B funnel using the latest data-driven techniques. Hear from global marketing experts, engage 
    in real-time case studies, and walk away with actionable tools to grow your brand's impact.`,
    image: '/images/event2.jpg',
  },
  {
    id: 3,
    title: 'AI & Innovation Forum',
    date: 'July 15, 2025',
    time: '4:00 PM',
    location: 'Webinar',
    description: `Explore how artificial intelligence is disrupting industries, from healthcare and 
    finance to education and logistics. This forum features keynote sessions from AI pioneers and 
    interactive panels discussing ethics, innovation, and real-world implementation. Whether you're 
    a tech enthusiast or business leader, this forum will expand your understanding of AI's power.`,
    image: '/images/event3.jpg',
  },
  {
    id: 4,
    title: 'Startup Founders Connect',
    date: 'August 1, 2025',
    time: '6:00 PM',
    location: 'Virtual Lounge',
    description: `Founders Connect is a curated experience for startup entrepreneurs and investors. 
    Join intimate roundtables, pitch sessions, and fireside chats with VCs and successful founders. 
    Whether you're launching your MVP or scaling your next big thing, this is your chance to grow 
    your network and gain feedback from those who’ve built iconic ventures.`,
    image: '/images/event4.jpg',
  },
  {
    id: 5,
    title: 'Future of SaaS Conference',
    date: 'Sept 5, 2025',
    time: '3:00 PM',
    location: 'Online Hub',
    description: `Get ready to explore the evolving landscape of Software as a Service. Discover 
    trends like product-led growth, low-code platforms, and vertical SaaS. Hear from unicorn founders, 
    growth experts, and product managers. Perfect for SaaS professionals, developers, and investors 
    looking to stay ahead of the curve.`,
    image: '/images/event5.jpg',
  },
  {
    id: 6,
    title: 'Virtual Reality Expo 2025',
    date: 'Oct 12, 2025',
    time: '1:00 PM',
    location: 'VR Platform',
    description: `Step into the metaverse! This interactive expo will showcase VR demos, product 
    launches, and keynote panels from leading VR creators. Test out new tech, explore virtual booths, 
    and learn how VR is redefining gaming, education, real estate, and remote work. A must-attend for 
    anyone passionate about immersive technology.`,
    image: '/images/event6.jpg',
  },
];

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const found = staticEvents.find(ev => ev.id === parseInt(id));
    setEvent(found);
  }, [id]);

  if (!event) {
    return (
      <div className="event-details">
        <h2>Event Not Found</h2>
        <Link to="/events" className="back-btn">← Back to Events</Link>
      </div>
    );
  }

  return (
    <div className="event-details">
      <img src={event.image} alt={event.title} className="event-image-large" />
      <h1>{event.title}</h1>
      <p className="event-meta">📅 {event.date} | 🕒 {event.time} | 📍 {event.location}</p>
      <p className="event-desc">{event.description}</p>

      <Link to={`/events/${event.id}/register`} className="register-btn-large">
        Register for this Event
      </Link>

      <Link to="/events" className="back-btn">← Back to Events</Link>
    </div>
  );
};

export default EventDetails;
