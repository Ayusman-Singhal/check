import React from 'react';
import './StatsCards.css';

const StatsCards = () => {
  const stats = [
    { value: '76k', label: 'Users', color: '#3498db', icon: 'users' },
    { value: '1.5m', label: 'Clicks', color: '#e74c3c', icon: 'clicks' },
    { value: '$3,6k', label: 'Sales', color: '#2ecc71', icon: 'sales' },
    { value: '47', label: 'Items', color: '#f39c12', icon: 'items' },
  ];

  return (
    <div className="stats-container">
      <div className="stats-cards">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">
              <span className="stat-dot" style={{ background: stat.color }}></span>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      <button className="stats-arrow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
    </div>
  );
};

export default StatsCards;
