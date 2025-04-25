import React from 'react';
import './WelcomeMessage.css';

const WelcomeMessage = ({ username }) => {
  return (
    <div className="welcome-message">
      <span className="welcome-text">WAY TO GO</span>
      <span className="username">{username}</span>
      <div className="welcome-accent"></div>
    </div>
  );
};

export default WelcomeMessage; 