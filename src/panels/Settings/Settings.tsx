import React, { useState } from 'react';
import { Bell, Moon, Shield, Globe } from 'lucide-react';
import './Settings.css';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoProtect, setAutoProtect] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);

  return (
    <div className="settings-panel">
      <h1 className="settings-title">Settings</h1>
      <p className="settings-subtitle">Customize your preferences</p>

      <div className="settings-list">
        <div className="settings-item">
          <div className="settings-item-info">
            <Bell className="settings-icon" />
            <div>
              <h3>Notifications</h3>
              <p>Receive alerts and updates</p>
            </div>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="settings-item">
          <div className="settings-item-info">
            <Moon className="settings-icon" />
            <div>
              <h3>Dark Mode</h3>
              <p>Use dark theme</p>
            </div>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="settings-item">
          <div className="settings-item-info">
            <Shield className="settings-icon" />
            <div>
              <h3>Auto Protection</h3>
              <p>Enable real-time protection</p>
            </div>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={autoProtect} onChange={() => setAutoProtect(!autoProtect)} />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="settings-item">
          <div className="settings-item-info">
            <Globe className="settings-icon" />
            <div>
              <h3>Auto Update</h3>
              <p>Automatically download updates</p>
            </div>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={autoUpdate} onChange={() => setAutoUpdate(!autoUpdate)} />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
