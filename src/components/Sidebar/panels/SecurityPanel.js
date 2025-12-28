import React, { useState } from 'react';
import PanelBase from './PanelBase';
import './SecurityPanel.css';

const SecurityPanel = ({ onClose }) => {
  const [settings, setSettings] = useState({
    twoFactor: true,
    notifications: true,
    autoLock: false,
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const securityItems = [
    { 
      id: 'twoFactor', 
      title: 'Two-Factor Auth', 
      description: 'Extra security layer',
      key: 'twoFactor'
    },
    { 
      id: 'notifications', 
      title: 'Security Alerts', 
      description: 'Get notified of issues',
      key: 'notifications'
    },
    { 
      id: 'autoLock', 
      title: 'Auto-Lock', 
      description: 'Lock after inactivity',
      key: 'autoLock'
    },
  ];

  return (
    <PanelBase title="Security" onClose={onClose} className="security-panel">
      <div className="panel-section">
        <h3 className="panel-section-title">Settings</h3>
        <div className="security-settings" role="group" aria-label="Security settings">
          {securityItems.map((item) => (
            <div key={item.id} className="security-item">
              <div className="security-info">
                <span className="security-title">{item.title}</span>
                <span className="security-desc">{item.description}</span>
              </div>
              <button
                role="switch"
                aria-checked={settings[item.key]}
                aria-label={`${item.title}: ${settings[item.key] ? 'enabled' : 'disabled'}`}
                className={`toggle-switch ${settings[item.key] ? 'active' : ''}`}
                onClick={() => handleToggle(item.key)}
              >
                <span className="toggle-thumb" aria-hidden="true"></span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="panel-section">
        <h3 className="panel-section-title">Actions</h3>
        <div className="security-actions">
          <button className="security-action-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Change Password
          </button>
          <button className="security-action-btn danger">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sign Out All Devices
          </button>
        </div>
      </div>
    </PanelBase>
  );
};

export default SecurityPanel;
