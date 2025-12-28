import React, { useState } from 'react';
import './App.css';
import TitleBar from './components/TitleBar';
import Sidebar from './components/Sidebar/index';
import Dashboard from './components/Dashboard';
import DashboardPanel from './components/Sidebar/panels/DashboardPanel';
import DocumentsPanel from './components/Sidebar/panels/DocumentsPanel';
import EditPanel from './components/Sidebar/panels/EditPanel';
import CalendarPanel from './components/Sidebar/panels/CalendarPanel';
import LinksPanel from './components/Sidebar/panels/LinksPanel';
import SecurityPanel from './components/Sidebar/panels/SecurityPanel';

const PANELS = {
  dashboard: null, // null means show the main Dashboard
  documents: DocumentsPanel,
  edit: EditPanel,
  calendar: CalendarPanel,
  links: LinksPanel,
  security: SecurityPanel,
};

function App() {
  const [activePanel, setActivePanel] = useState('dashboard');

  const handlePanelChange = (panelId) => {
    setActivePanel(panelId);
  };

  const ActivePanelComponent = PANELS[activePanel];
  const showDashboard = activePanel === 'dashboard' || !ActivePanelComponent;

  return (
    <div className="app">
      <div className="app-background">
        <div className="gradient-overlay"></div>
      </div>
      <div className="app-container">
        <TitleBar />
        <div className="main-layout">
          <Sidebar activePanel={activePanel} onPanelChange={handlePanelChange} />
          <main className="main-content" key={activePanel}>
            {showDashboard ? (
              <Dashboard />
            ) : (
              <div className="panel-view">
                <ActivePanelComponent onClose={() => setActivePanel('dashboard')} />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
