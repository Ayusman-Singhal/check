import React, { useState } from 'react';
import { IconBell, IconMoon, IconShield, IconGlobe, IconPalette, IconCheck } from '@tabler/icons-react';
import { useTheme, ThemeType } from '../../context/ThemeContext';
import './Settings.css';

const themes: { id: ThemeType; name: string; description: string; colors: string[] }[] = [
  { 
    id: 'rose', 
    name: 'Rose', 
    description: 'Elegant rose pink theme',
    colors: ['#be123c', '#fecdd3', '#fff1f2']
  },
  { 
    id: 'material-light', 
    name: 'Material Light', 
    description: 'Soft lavender light theme',
    colors: ['#1e1b4b', '#e0e0f0', '#f5f3ff']
  },
  { 
    id: 'material-dark', 
    name: 'Material Dark', 
    description: 'Pure black dark theme',
    colors: ['#4fc3f7', '#1a1a1a', '#000000']
  },
];

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [autoProtect, setAutoProtect] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);

  return (
    <div className="settings-panel">
      <h1 className="settings-title">Settings</h1>
      <p className="settings-subtitle">Customize your preferences</p>

      <div className="settings-section">
        <div className="section-title">
          <IconPalette size={20} />
          <span>Theme</span>
        </div>
        <div className="theme-grid">
          {themes.map((t) => (
            <button
              key={t.id}
              className={`theme-card ${theme === t.id ? 'active' : ''}`}
              onClick={() => setTheme(t.id)}
            >
              <div className="theme-preview">
                {t.colors.map((color, idx) => (
                  <div 
                    key={idx} 
                    className="theme-color" 
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="theme-info">
                <span className="theme-name">{t.name}</span>
                <span className="theme-desc">{t.description}</span>
              </div>
              {theme === t.id && (
                <div className="theme-check">
                  <IconCheck size={16} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <div className="section-title">
          <IconBell size={20} />
          <span>Preferences</span>
        </div>
        <div className="settings-list">
          <div className="settings-item">
            <div className="settings-item-info">
              <IconBell className="settings-icon" />
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
              <IconShield className="settings-icon" />
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
              <IconGlobe className="settings-icon" />
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
    </div>
  );
};

export default Settings;
