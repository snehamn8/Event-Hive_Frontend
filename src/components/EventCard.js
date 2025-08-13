// src/components/EventCard.js
import React from 'react';
import './Card.css';

const EventCard = ({ event }) => {
  return (
    <div className="card">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
    </div>
  );
};

export default EventCard;
