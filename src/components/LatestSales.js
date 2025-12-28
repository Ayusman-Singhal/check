import React from 'react';
import './LatestSales.css';

const LatestSales = () => {
  return (
    <div className="sales-card">
      <div className="sales-header">
        <h3>Latest Sales</h3>
        <div className="sales-trend">
          <svg width="40" height="20" viewBox="0 0 40 20">
            <path d="M0 15 Q10 10, 20 12 T40 8" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"/>
          </svg>
          <span className="trend-badge">6%</span>
        </div>
      </div>
      
      <div className="sales-content">
        <div className="sales-info">
          <div className="sales-amount">
            <span className="currency">$</span>
            <span className="value">586</span>
          </div>
          <div className="sales-label">
            <div className="label-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <span>Your total earnings</span>
          </div>
        </div>
        
        <div className="product-card">
          <div className="product-image">
            <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop" alt="Backpack" />
          </div>
          <span className="product-name">Synthetics backpack</span>
        </div>
      </div>
    </div>
  );
};

export default LatestSales;
