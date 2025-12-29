import React from 'react';
import { IconMinus, IconSquare, IconX, IconCopy } from '@tabler/icons-react';
import './Titlebar.css';

const { ipcRenderer } = window.require('electron');

interface TitlebarProps {
  title?: string;
}

const Titlebar: React.FC<TitlebarProps> = ({ title = 'System Utility' }) => {
  const handleMinimize = () => {
    ipcRenderer.invoke('minimize-window');
  };

  const handleMaximize = () => {
    ipcRenderer.invoke('maximize-window');
  };

  const handleClose = () => {
    ipcRenderer.invoke('close-window');
  };

  return (
    <div className="titlebar">
      <div className="titlebar-drag">
        <div className="titlebar-icon">
          <div className="app-logo">S</div>
        </div>
        <span className="titlebar-title">{title}</span>
      </div>
      <div className="titlebar-controls">
        <button className="titlebar-btn minimize" onClick={handleMinimize} title="Minimize">
          <IconMinus size={16} />
        </button>
        <button className="titlebar-btn maximize" onClick={handleMaximize} title="Maximize">
          <IconCopy size={14} />
        </button>
        <button className="titlebar-btn close" onClick={handleClose} title="Close">
          <IconX size={16} />
        </button>
      </div>
    </div>
  );
};

export default Titlebar;
