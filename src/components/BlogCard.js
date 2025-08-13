// src/components/BlogCard.js
import React from 'react';
import './Card.css';

const BlogCard = ({ blog }) => {
  return (
    <div className="card">
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
      <p><strong>Tags:</strong> {blog.tags.join(', ')}</p>
    </div>
  );
};

export default BlogCard;
