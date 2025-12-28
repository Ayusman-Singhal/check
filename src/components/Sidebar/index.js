import React, { useCallback, useRef } from 'react';
import './Sidebar.css';

const PANELS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'documents', label: 'Documents', icon: 'document' },
  { id: 'edit', label: 'Edit', icon: 'edit' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar' },
  { id: 'links', label: 'Links', icon: 'link' },
  { id: 'security', label: 'Security', icon: 'lock' },
];

const Sidebar = ({ activePanel, onPanelChange }) => {
  const navRef = useRef(null);

  const handleKeyDown = useCallback((e, panelId, index) => {
    const buttons = navRef.current?.querySelectorAll('[role="tab"]');
    if (!buttons) return;

    let nextIndex = index;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = (index + 1) % buttons.length;
        break;
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = (index - 1 + buttons.length) % buttons.length;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = buttons.length - 1;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onPanelChange(panelId);
        return;
      default:
        return;
    }

    buttons[nextIndex]?.focus();
  }, [onPanelChange]);

  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="sidebar-top">
        <div className="sidebar-logo" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <nav 
        ref={navRef}
        className="sidebar-nav" 
        role="tablist" 
        aria-label="Main sections"
        aria-orientation="vertical"
      >
        {PANELS.map((panel, index) => (
          <SidebarButton
            key={panel.id}
            panel={panel}
            isActive={activePanel === panel.id}
            onClick={() => onPanelChange(panel.id)}
            onKeyDown={(e) => handleKeyDown(e, panel.id, index)}
          />
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button 
          className="sidebar-item notification"
          aria-label="Notifications (3 unread)"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="notification-dot" aria-hidden="true"></span>
        </button>
        <button 
          className="sidebar-item"
          aria-label="Settings"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
      </div>
    </aside>
  );
};

const SidebarButton = ({ panel, isActive, onClick, onKeyDown }) => {
  const renderIcon = (icon) => {
    const icons = {
      dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
      document: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
      edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
      calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
      link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>,
      lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>
    };
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        {icons[icon]}
      </svg>
    );
  };

  return (
    <button
      id={`tab-${panel.id}`}
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${panel.id}`}
      className={`sidebar-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={isActive ? 0 : -1}
    >
      {renderIcon(panel.icon)}
      <span className="sr-only">{panel.label}</span>
    </button>
  );
};

export default Sidebar;
