// src/components/Header.js
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };

  return (
    <header className={`header ${darkMode ? 'dark' : ''}`}>
      <div className="logo">
        <Link to="/">EventHive</Link>
      </div>

      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/events" className={location.pathname === '/events' ? 'active' : ''}>Events</Link>
        <Link to="/blogs" className={location.pathname === '/blogs' ? 'active' : ''}>Blogs</Link>
        <Link to="/videos" className={location.pathname === '/videos' ? 'active' : ''}>Videos</Link>

        {user?.role === 'admin' && (
          <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Admin Dashboard</Link>
        )}

        {user ? (
          <>
            <span className="user-name">Hi, {user.name || user.email}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
        )}
      </nav>

      <div className="header-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </button>

        <div className="menu-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
