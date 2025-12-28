import React from 'react';
import './PanelBase.css';

/**
 * Base component for all sidebar panels
 * Provides consistent structure, accessibility, and styling
 */
const PanelBase = ({ 
  title, 
  children, 
  onClose,
  className = '',
  actions = null 
}) => {
  return (
    <div className={`panel-base ${className}`}>
      <header className="panel-header">
        <h2 className="panel-title" id="panel-title">{title}</h2>
        <div className="panel-header-actions">
          {actions}
          <button
            className="panel-close-btn"
            onClick={onClose}
            aria-label="Close panel"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </header>
      <div 
        className="panel-content"
        role="region"
        aria-labelledby="panel-title"
      >
        {children}
      </div>
    </div>
  );
};

export default PanelBase;
