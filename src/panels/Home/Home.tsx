import React from 'react';
import { IconHome, IconFolder, IconActivity } from '@tabler/icons-react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-panel">
      <h1 className="home-title">Welcome Home</h1>
      <p className="home-subtitle">Your system overview at a glance</p>
      
      <div className="home-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <IconHome size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">128 GB</span>
            <span className="stat-label">Total Storage</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <IconFolder size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">2,451</span>
            <span className="stat-label">Files</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <IconActivity size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">Good</span>
            <span className="stat-label">System Health</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
