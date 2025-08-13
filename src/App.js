import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BlogDetails from './pages/BlogDetails';
import Home from './pages/Home';
import Events from './pages/Events';
import Blogs from './pages/Blogs';
import Videos from './pages/Videos';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EventDetails from './pages/EventDetails';
import EventRegister from './pages/EventRegister';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEvents from './pages/admin/AdminEvents';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminVideos from './pages/admin/AdminVideos';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAddEvent from './pages/admin/AdminAddEvent';
import AdminAddBlog from './pages/admin/AdminAddBlog';
import AdminAddVideo from './pages/admin/AdminAddVideo';

import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          {/* 🌐 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/:eventId/register" element={<EventRegister />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />


          {/* 🔐 Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <PrivateRoute role="admin">
                <AdminEvents />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/blogs"
            element={
              <PrivateRoute role="admin">
                <AdminBlogs />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/videos"
            element={
              <PrivateRoute role="admin">
                <AdminVideos />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute role="admin">
                <AdminUsers />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/events/add"
            element={
              <PrivateRoute role="admin">
                <AdminAddEvent />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/blogs/add"
            element={
              <PrivateRoute role="admin">
                <AdminAddBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/videos/add"
            element={
              <PrivateRoute role="admin">
                <AdminAddVideo />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
