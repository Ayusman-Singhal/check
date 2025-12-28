import React from 'react';
import './Dashboard.css';
import HeroSection from './HeroSection';
import StatsCards from './StatsCards';
import ActiveUsersChart from './ActiveUsersChart';
import LatestSales from './LatestSales';
import VideoList from './VideoList';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="dashboard-main">
          <HeroSection />
          <StatsCards />
          <VideoList />
        </div>
        <div className="dashboard-sidebar">
          <ActiveUsersChart />
          <LatestSales />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
