// src/pages/admin/AdminEvents.js
import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/events');
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const handleDelete = async (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      await fetch(`http://localhost:5000/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setEvents(events.filter((event) => event._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="admin-section">
      <h2>📅 Manage Events</h2>
      <Link to="/admin/events/add" className="add-btn">➕ Add Event</Link>
      <table>
        <thead>
          <tr>
            <th>Title</th><th>Date</th><th>Location</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e._id}>
              <td>{e.title}</td>
              <td>{new Date(e.date).toDateString()}</td>
              <td>{e.location}</td>
              <td>
                <button onClick={() => handleDelete(e._id)}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminEvents;
