import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <span className="hero-label">Popular Solution</span>
        <h2 className="hero-title">
          Optimize<br />
          Your Metrics
        </h2>
        <button className="hero-btn">Start Now</button>
      </div>
      <div className="hero-image">
        <img 
          src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&crop=face" 
          alt="Model"
        />
      </div>
    </div>
  );
};

export default HeroSection;
