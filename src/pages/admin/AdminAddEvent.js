// src/pages/admin/AdminAddEvent.js
import React, { useState } from 'react';
import './AdminForm.css';

const AdminAddEvent = ({ onEventAdded }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: '',
  });

  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setEventData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setEventData((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
        setUploading(false);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      setMessage('❌ Please log in to create an event.');
      return;
    }

    // 🔍 Confirm all fields are filled
    const { title, description, date, time, location, image } = eventData;
    if (!title || !description || !date || !time || !location || !image) {
      setMessage('❌ All fields, including an image, are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          ...eventData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Event created successfully!');
        setEventData({
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
          image: '',
        });
        if (onEventAdded) onEventAdded();
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error submitting event:', error);
      setMessage('❌ Failed to create event. Please check your connection.');
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          name="title"
          placeholder="Event Title"
          required
          value={eventData.title}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Description"
          required
          value={eventData.description}
          onChange={handleChange}
        />
        <input
          name="date"
          type="date"
          required
          value={eventData.date}
          onChange={handleChange}
        />
        <input
          name="time"
          type="time"
          required
          value={eventData.time}
          onChange={handleChange}
        />
        <input
          name="location"
          placeholder="Location"
          required
          value={eventData.location}
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleImageUpload}
          required
        />

        {uploading && <p>Uploading image...</p>}

        {eventData.image && (
          <img
            src={eventData.image}
            alt="Preview"
            style={{
              marginTop: '10px',
              width: '100%',
              maxWidth: '300px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          />
        )}

        <button type="submit">Create Event</button>
        {message && <p className="msg">{message}</p>}
      </form>
    </div>
  );
};

export default AdminAddEvent;
