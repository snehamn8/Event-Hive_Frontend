import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]); // ✅ Ensure it's an array
  const [error, setError] = useState('');

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.token) {
        throw new Error('No token');
      }

      const res = await fetch('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${user.token}`, // ✅ Token added
        },
      });

      const data = await res.json();
      if (res.ok) {
        setUsers(data);
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      setError(err.message || 'Error fetching users');
    }
  };

  fetchUsers();
}, []);


  return (
    <div className="admin-section">
      <h2>👥 Manage Users</h2>

      {error && <p className="msg error">❌ {error}</p>}

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Registered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toDateString()}</td>
                <td>
                  <button onClick={() => console.log('Delete user', user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
