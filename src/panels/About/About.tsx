import React from 'react';
import { Info, Github, Mail, Heart } from 'lucide-react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-panel">
      <div className="about-header">
        <div className="about-logo">S</div>
        <h1 className="about-title">System Utility</h1>
        <p className="about-version">Version 1.0.0</p>
      </div>

      <div className="about-content">
        <div className="about-card">
          <Info className="about-icon" />
          <h3>About</h3>
          <p>A powerful system utility application built with Electron and React. Clean, optimize, and monitor your system with ease.</p>
        </div>

        <div className="about-links">
          <a href="#" className="about-link">
            <Github size={18} />
            <span>GitHub Repository</span>
          </a>
          <a href="#" className="about-link">
            <Mail size={18} />
            <span>Contact Support</span>
          </a>
        </div>

        <div className="about-footer">
          <p>Made with <Heart size={14} className="heart-icon" /> by Your Team</p>
          <p className="copyright">© 2024 All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default About;
