import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </div>
  );
};

export default NotFound;