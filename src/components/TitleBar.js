import React from 'react';
import './TitleBar.css';

const TitleBar = () => {
  const getIpcRenderer = () => {
    try {
      return window.require('electron').ipcRenderer;
    } catch (e) {
      return null;
    }
  };

  const handleMinimize = () => {
    const ipcRenderer = getIpcRenderer();
    if (ipcRenderer) ipcRenderer.send('minimize-window');
  };

  const handleMaximize = () => {
    const ipcRenderer = getIpcRenderer();
    if (ipcRenderer) ipcRenderer.send('maximize-window');
  };

  const handleClose = () => {
    const ipcRenderer = getIpcRenderer();
    if (ipcRenderer) ipcRenderer.send('close-window');
  };

  return (
    <div className="titlebar">
      <div className="titlebar-drag-region">
        <div className="titlebar-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="titlebar-title">Channel Analytics</h1>
      </div>
      <div className="titlebar-actions">
        <button className="titlebar-icon-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M9 12l2 2 4-4"/>
          </svg>
        </button>
        <button className="titlebar-icon-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </button>
        <div className="titlebar-avatar">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face" alt="User" />
        </div>
      </div>
      <div className="window-controls">
        <button className="window-btn minimize" onClick={handleMinimize}>
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect y="5" width="12" height="2" fill="currentColor"/>
          </svg>
        </button>
        <button className="window-btn maximize" onClick={handleMaximize}>
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect x="1" y="1" width="10" height="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </button>
        <button className="window-btn close" onClick={handleClose}>
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
