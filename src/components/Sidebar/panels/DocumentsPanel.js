import React, { useState } from 'react';
import PanelBase from './PanelBase';
import './DocumentsPanel.css';

const DocumentsPanel = ({ onClose }) => {
  const [documents] = useState([
    { id: 1, name: 'Q4 Report.pdf', type: 'pdf', date: 'Dec 20, 2025' },
    { id: 2, name: 'Analytics Data.xlsx', type: 'excel', date: 'Dec 18, 2025' },
    { id: 3, name: 'Presentation.pptx', type: 'ppt', date: 'Dec 15, 2025' },
    { id: 4, name: 'Meeting Notes.docx', type: 'doc', date: 'Dec 12, 2025' },
  ]);

  const getFileIcon = (type) => {
    const colors = {
      pdf: '#e74c3c',
      excel: '#27ae60',
      ppt: '#f39c12',
      doc: '#3498db'
    };
    return (
      <div className="file-icon" style={{ background: colors[type] || '#666' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
        </svg>
      </div>
    );
  };

  return (
    <PanelBase 
      title="Documents" 
      onClose={onClose} 
      className="documents-panel"
      actions={
        <button className="panel-action-btn" aria-label="Upload new document">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </button>
      }
    >
      <div className="panel-section">
        <h3 className="panel-section-title">Recent Files</h3>
        <ul className="panel-list" role="list" aria-label="Recent documents">
          {documents.map((doc) => (
            <li key={doc.id}>
              <button
                className="panel-list-item document-item"
                aria-label={`${doc.name}, modified ${doc.date}`}
              >
                <span className="panel-list-icon">{getFileIcon(doc.type)}</span>
                <span className="panel-list-content">
                  <span className="panel-list-title">{doc.name}</span>
                  <span className="panel-list-subtitle">{doc.date}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </PanelBase>
  );
};

export default DocumentsPanel;
