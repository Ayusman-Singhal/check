import React from 'react';
import PanelBase from './PanelBase';
import './LinksPanel.css';

const LinksPanel = ({ onClose }) => {
  const links = [
    { id: 1, title: 'Documentation', url: 'docs.example.com', category: 'Resources' },
    { id: 2, title: 'API Reference', url: 'api.example.com', category: 'Resources' },
    { id: 3, title: 'GitHub Repo', url: 'github.com/project', category: 'Development' },
    { id: 4, title: 'Figma Designs', url: 'figma.com/file/...', category: 'Design' },
  ];

  const groupedLinks = links.reduce((acc, link) => {
    if (!acc[link.category]) acc[link.category] = [];
    acc[link.category].push(link);
    return acc;
  }, {});

  return (
    <PanelBase 
      title="Quick Links" 
      onClose={onClose} 
      className="links-panel"
      actions={
        <button className="panel-action-btn" aria-label="Add new link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </button>
      }
    >
      {Object.entries(groupedLinks).map(([category, categoryLinks]) => (
        <div key={category} className="panel-section">
          <h3 className="panel-section-title">{category}</h3>
          <ul className="panel-list" role="list" aria-label={`${category} links`}>
            {categoryLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`https://${link.url}`}
                  className="panel-list-item link-item"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.title} - opens in new tab`}
                >
                  <span className="panel-list-icon link-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                  </span>
                  <span className="panel-list-content">
                    <span className="panel-list-title">{link.title}</span>
                    <span className="panel-list-subtitle">{link.url}</span>
                  </span>
                  <span className="link-external" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15,3 21,3 21,9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </PanelBase>
  );
};

export default LinksPanel;
