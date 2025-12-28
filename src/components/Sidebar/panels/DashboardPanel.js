import React, { useState } from 'react';
import PanelBase from './PanelBase';
import './DashboardPanel.css';

const DashboardPanel = ({ onClose }) => {
  const [selectedWidget, setSelectedWidget] = useState(null);

  const widgets = [
    { id: 'overview', title: 'Overview', subtitle: 'Main metrics', icon: 'chart' },
    { id: 'analytics', title: 'Analytics', subtitle: 'Detailed stats', icon: 'analytics' },
    { id: 'reports', title: 'Reports', subtitle: 'Weekly summary', icon: 'report' },
    { id: 'realtime', title: 'Real-time', subtitle: 'Live data', icon: 'live' },
  ];

  const handleWidgetSelect = (widgetId) => {
    setSelectedWidget(widgetId);
  };

  const handleKeyDown = (e, widgetId, index) => {
    const items = document.querySelectorAll('.dashboard-widget-btn');
    let nextIndex = index;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = (index + 1) % items.length;
        break;
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = (index - 1 + items.length) % items.length;
        break;
      default:
        return;
    }
    items[nextIndex]?.focus();
  };

  const renderIcon = (icon) => {
    const icons = {
      chart: <path d="M3 3v18h18M9 17V9m4 8V5m4 12v-6"/>,
      analytics: <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
      report: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></>,
      live: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06"/></>
    };
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        {icons[icon]}
      </svg>
    );
  };

  return (
    <PanelBase title="Dashboard" onClose={onClose} className="dashboard-panel">
      <div className="panel-section">
        <h3 className="panel-section-title">Widgets</h3>
        <ul className="panel-list" role="listbox" aria-label="Dashboard widgets">
          {widgets.map((widget, index) => (
            <li key={widget.id} role="option" aria-selected={selectedWidget === widget.id}>
              <button
                className={`panel-list-item dashboard-widget-btn ${selectedWidget === widget.id ? 'active' : ''}`}
                onClick={() => handleWidgetSelect(widget.id)}
                onKeyDown={(e) => handleKeyDown(e, widget.id, index)}
                aria-describedby={`widget-desc-${widget.id}`}
              >
                <span className="panel-list-icon">{renderIcon(widget.icon)}</span>
                <span className="panel-list-content">
                  <span className="panel-list-title">{widget.title}</span>
                  <span className="panel-list-subtitle" id={`widget-desc-${widget.id}`}>
                    {widget.subtitle}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="panel-section">
        <h3 className="panel-section-title">Quick Stats</h3>
        <div className="dashboard-stats" role="group" aria-label="Quick statistics">
          <div className="dashboard-stat" tabIndex="0">
            <span className="stat-value">76k</span>
            <span className="stat-label">Users</span>
          </div>
          <div className="dashboard-stat" tabIndex="0">
            <span className="stat-value">1.5m</span>
            <span className="stat-label">Views</span>
          </div>
        </div>
      </div>
    </PanelBase>
  );
};

export default DashboardPanel;
