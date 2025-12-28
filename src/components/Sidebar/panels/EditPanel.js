import React from 'react';
import PanelBase from './PanelBase';
import './EditPanel.css';

const EditPanel = ({ onClose }) => {
  const tools = [
    { id: 'text', label: 'Text Tool', shortcut: 'T' },
    { id: 'shape', label: 'Shape Tool', shortcut: 'S' },
    { id: 'pen', label: 'Pen Tool', shortcut: 'P' },
    { id: 'eraser', label: 'Eraser', shortcut: 'E' },
  ];

  return (
    <PanelBase title="Edit Tools" onClose={onClose} className="edit-panel">
      <div className="panel-section">
        <h3 className="panel-section-title">Tools</h3>
        <div className="edit-tools" role="toolbar" aria-label="Editing tools">
          {tools.map((tool) => (
            <button
              key={tool.id}
              className="edit-tool-btn"
              aria-label={`${tool.label} (${tool.shortcut})`}
              aria-keyshortcuts={tool.shortcut}
            >
              <span className="tool-label">{tool.label}</span>
              <kbd className="tool-shortcut">{tool.shortcut}</kbd>
            </button>
          ))}
        </div>
      </div>

      <div className="panel-section">
        <h3 className="panel-section-title">Properties</h3>
        <div className="edit-properties">
          <label className="edit-property">
            <span className="property-label">Opacity</span>
            <input 
              type="range" 
              min="0" 
              max="100" 
              defaultValue="100"
              aria-label="Opacity percentage"
              className="property-slider"
            />
          </label>
          <label className="edit-property">
            <span className="property-label">Size</span>
            <input 
              type="range" 
              min="1" 
              max="100" 
              defaultValue="10"
              aria-label="Brush size"
              className="property-slider"
            />
          </label>
        </div>
      </div>
    </PanelBase>
  );
};

export default EditPanel;
