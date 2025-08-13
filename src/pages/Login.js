import React, { useState, useContext } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext); // ✅ Use AuthContext
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    isAdmin: false,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data); // ✅ Update AuthContext globally
        navigate(data.role === 'admin' ? '/admin' : '/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong!');
    }
  };

  return (
    <div className="login-page">
      <h2>Login to EventHive</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        {/* Optional toggle, not used for backend auth but for UX label */}
        {/* <label className="checkbox-label">
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleChange}
          />
          Login as Admin
        </label> */}

        <button type="submit">Login</button>
        {error && <p className="error-msg">{error}</p>}

        <div className="login-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <span>•</span>
          <Link to="/signup">Register here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
