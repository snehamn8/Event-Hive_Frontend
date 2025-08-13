// src/pages/EventRegister.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EventRegister.css';

const sampleEvents = [
  {
    id: '1',
    title: 'Tech Trends 2025',
  },
  {
    id: '2',
    title: 'Marketing Summit',
  },
  {
    id: '3',
    title: 'AI & Innovation Forum',
  },
  {
    id: '4',
    title: 'Startup Founders Connect',
  },
  {
    id: '5',
    title: 'UX & Product Design Expo',
  },
  {
    id: '6',
    title: 'Cloud & DevOps Conclave',
  },
];

const EventRegister = () => {
  const { eventId } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
    eventId: ''
  });

  const [eventTitle, setEventTitle] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (eventId) {
      setFormData(prev => ({ ...prev, eventId }));
      const event = sampleEvents.find(e => e.id === eventId);
      setEventTitle(event ? event.title : 'Event not found');
    }
  }, [eventId]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('✅ Registration successful!');
        setFormData({ name: '', email: '', phone: '', company: '', notes: '', eventId });
      } else {
        setMessage(`❌ ${result.message}`);
      }
    } catch (err) {
      setMessage('❌ Error submitting form');
    }
  };

  return (
    <div className="register-form">
      <h2>Register for: <span className="highlight">{eventTitle}</span></h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" required value={formData.phone} onChange={handleChange} />
        <input name="company" placeholder="Company/Organization" value={formData.company} onChange={handleChange} />
        <textarea name="notes" placeholder="Additional notes" value={formData.notes} onChange={handleChange}></textarea>
        <button type="submit">Submit Registration</button>
        {message && <p className="msg">{message}</p>}
      </form>
    </div>
  );
};

export default EventRegister;
