import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, Trash2, HardDrive, Globe, FileBox, Download, 
  Chrome, Compass, Flame, Monitor, FileText, Clock, FolderOpen,
  Database, Eye, AlertTriangle, CheckCircle, File
} from 'lucide-react';
import { Dialog, DialogHeader, DialogContent, DialogFooter } from '../../components/ui/dialog';
import './Clean.css';

const { ipcRenderer } = window.require('electron');

interface CleanupItem {
  id: string;
  name: string;
  icon: string;
  size: number;
  sizeFormatted: string;
  paths: string[];
  description: string;
  checked: boolean;
  type: 'browser' | 'system';
  special?: string;
}

interface RegistryIssue {
  id: string;
  category: string;
  description: string;
  name: string;
  path: string;
  registryPath: string;
  checked: boolean;
}

interface PreviewFile {
  name: string;
  path: string;
  size: number;
  sizeFormatted: string;
  isDirectory: boolean;
}

interface PreviewItem {
  id: string;
  name: string;
  totalFiles: number;
  files: PreviewFile[];
  sizeFormatted: string;
}

interface ScanResult {
  browsers: CleanupItem[];
  systemFiles: CleanupItem[];
  stats: {
    system: string;
    browser: string;
    temp: string;
    downloads: string;
    total: string;
  };
  scanTime: string;
}

const getIcon = (iconType: string, className: string) => {
  const size = 20;
  switch (iconType) {
    case 'chrome': return <Chrome size={size} className={className} />;
    case 'edge': return <Compass size={size} className={className} />;
    case 'firefox': return <Globe size={size} className={className} />;
    case 'brave': return <Flame size={size} className={className} />;
    case 'opera': return <Globe size={size} className={className} />;
    case 'vivaldi': return <Globe size={size} className={className} />;
    case 'system': return <HardDrive size={size} className={className} />;
    case 'temp': return <FileBox size={size} className={className} />;
    case 'downloads': return <Download size={size} className={className} />;
    case 'trash': return <Trash2 size={size} className={className} />;
    case 'recent': return <Clock size={size} className={className} />;
    case 'logs': return <FileText size={size} className={className} />;
    default: return <FolderOpen size={size} className={className} />;
  }
};

const Clean: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'files' | 'registry'>('files');
  const [scanning, setScanning] = useState(false);
  const [cleaning, setCleaning] = useState(false);
  const [lastScan, setLastScan] = useState<string | null>(null);
  const [browsers, setBrowsers] = useState<CleanupItem[]>([]);
  const [systemFiles, setSystemFiles] = useState<CleanupItem[]>([]);
  const [stats, setStats] = useState({ system: '0 B', browser: '0 B', temp: '0 B', downloads: '0 B' });
  
  // Registry state
  const [registryIssues, setRegistryIssues] = useState<RegistryIssue[]>([]);
  const [scanningRegistry, setScanningRegistry] = useState(false);
  const [cleaningRegistry, setCleaningRegistry] = useState(false);
  
  // Preview dialog state
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewItem[]>([]);
  const [loadingPreview, setLoadingPreview] = useState(false);

  const scanSystem = async () => {
    setScanning(true);
    try {
      const result = await ipcRenderer.invoke('scan-system');
      if (result.success) {
        const data: ScanResult = result.data;
        setBrowsers(data.browsers);
        setSystemFiles(data.systemFiles);
        setStats(data.stats);
        setLastScan(data.scanTime);
      }
    } catch (error) {
      console.error('Scan failed:', error);
    }
    setScanning(false);
  };

  const scanRegistryIssues = async () => {
    setScanningRegistry(true);
    try {
      const result = await ipcRenderer.invoke('scan-registry');
      if (result.success) {
        setRegistryIssues(result.data);
      }
    } catch (error) {
      console.error('Registry scan failed:', error);
    }
    setScanningRegistry(false);
  };

  useEffect(() => {
    scanSystem();
  }, []);

  const toggleItem = (id: string, type: 'browser' | 'system') => {
    if (type === 'browser') {
      setBrowsers(browsers.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      ));
    } else {
      setSystemFiles(systemFiles.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      ));
    }
  };

  const toggleRegistryIssue = (id: string) => {
    setRegistryIssues(registryIssues.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const getSelectedItems = () => {
    return [
      ...browsers.filter(b => b.checked),
      ...systemFiles.filter(s => s.checked)
    ];
  };

  const getSelectedSize = () => {
    const selectedBrowsers = browsers.filter(b => b.checked).reduce((sum, b) => sum + b.size, 0);
    const selectedSystem = systemFiles.filter(s => s.checked).reduce((sum, s) => sum + s.size, 0);
    const total = selectedBrowsers + selectedSystem;
    
    if (total === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(total) / Math.log(k));
    return parseFloat((total / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const showCleanupPreview = async () => {
    const selectedItems = getSelectedItems();
    if (selectedItems.length === 0) return;

    setLoadingPreview(true);
    setShowPreview(true);
    
    try {
      const result = await ipcRenderer.invoke('get-cleanup-preview', selectedItems);
      if (result.success) {
        setPreviewData(result.data);
      }
    } catch (error) {
      console.error('Preview failed:', error);
    }
    setLoadingPreview(false);
  };

  const cleanSelected = async () => {
    const selectedItems = getSelectedItems();
    if (selectedItems.length === 0) return;
    
    setShowPreview(false);
    setCleaning(true);
    try {
      await ipcRenderer.invoke('clean-items', selectedItems);
      await scanSystem();
    } catch (error) {
      console.error('Clean failed:', error);
    }
    setCleaning(false);
  };

  const cleanSingleItem = async (item: CleanupItem) => {
    setCleaning(true);
    try {
      await ipcRenderer.invoke('clean-items', [item]);
      await scanSystem();
    } catch (error) {
      console.error('Clean failed:', error);
    }
    setCleaning(false);
  };

  const cleanSelectedRegistry = async () => {
    const selectedIssues = registryIssues.filter(i => i.checked);
    if (selectedIssues.length === 0) return;

    setCleaningRegistry(true);
    try {
      const result = await ipcRenderer.invoke('clean-registry', selectedIssues);
      if (result.success) {
        await scanRegistryIssues();
      }
    } catch (error) {
      console.error('Registry clean failed:', error);
    }
    setCleaningRegistry(false);
  };

  const renderItem = (item: CleanupItem) => (
    <div key={item.id} className="cleanup-item">
      <div className="item-left">
        <label className="checkbox-wrapper">
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => toggleItem(item.id, item.type)}
          />
          <span className="checkmark"></span>
        </label>
        {getIcon(item.icon, `item-icon ${item.icon}`)}
        <div className="item-info">
          <span className="item-title">{item.name}</span>
          <span className="item-description">{item.description}</span>
        </div>
      </div>
      <div className="item-right">
        <span className="item-size">{item.sizeFormatted}</span>
        <button 
          className="item-clean-btn" 
          onClick={() => cleanSingleItem(item)}
          disabled={cleaning}
        >
          Clean
        </button>
      </div>
    </div>
  );

  return (
    <div className="clean-panel">
      <div className="clean-tabs">
        <button
          className={`clean-tab ${activeTab === 'files' ? 'active' : ''}`}
          onClick={() => setActiveTab('files')}
        >
          <Trash2 size={18} />
          File Cleanup
        </button>
        <button
          className={`clean-tab ${activeTab === 'registry' ? 'active' : ''}`}
          onClick={() => { setActiveTab('registry'); if (registryIssues.length === 0) scanRegistryIssues(); }}
        >
          <Database size={18} />
          Registry Cleaner
        </button>
      </div>

      {activeTab === 'files' && (
        <>
          <div className="clean-header">
            <button className="scan-btn" onClick={scanSystem} disabled={scanning}>
              <RefreshCw size={16} className={scanning ? 'spinning' : ''} />
              {scanning ? 'Scanning...' : 'Scan System'}
            </button>
            <div className="header-actions">
              <button 
                className="preview-btn" 
                onClick={showCleanupPreview}
                disabled={cleaning || scanning || getSelectedItems().length === 0}
              >
                <Eye size={16} />
                Preview
              </button>
              <button 
                className="clean-btn-primary" 
                onClick={cleanSelected}
                disabled={cleaning || scanning || getSelectedItems().length === 0}
              >
                <Trash2 size={16} />
                {cleaning ? 'Cleaning...' : `Clean Selected (${getSelectedSize()})`}
              </button>
            </div>
          </div>

          {lastScan && (
            <div className="last-scan-bar">
              Last scan: {lastScan}
            </div>
          )}

          <div className="stats-grid">
            <div className="stat-card">
              <HardDrive size={24} className="stat-icon system" />
              <div className="stat-info">
                <span className="stat-label">System Files</span>
                <span className="stat-value">{stats.system}</span>
              </div>
            </div>
            <div className="stat-card">
              <Globe size={24} className="stat-icon browser" />
              <div className="stat-info">
                <span className="stat-label">Browser Files</span>
                <span className="stat-value">{stats.browser}</span>
              </div>
            </div>
            <div className="stat-card">
              <FileBox size={24} className="stat-icon temp" />
              <div className="stat-info">
                <span className="stat-label">Temp Files</span>
                <span className="stat-value">{stats.temp}</span>
              </div>
            </div>
            <div className="stat-card">
              <Download size={24} className="stat-icon downloads" />
              <div className="stat-info">
                <span className="stat-label">Downloads Files</span>
                <span className="stat-value">{stats.downloads}</span>
              </div>
            </div>
          </div>

          {browsers.length > 0 && (
            <div className="cleanup-section">
              <div className="cleanup-header">
                <Globe size={18} />
                <span>Browser Cache ({browsers.length} browsers detected)</span>
              </div>
              <div className="cleanup-list">
                {browsers.map(renderItem)}
              </div>
            </div>
          )}

          {systemFiles.length > 0 && (
            <div className="cleanup-section">
              <div className="cleanup-header">
                <Trash2 size={18} />
                <span>System Cleanup Items</span>
              </div>
              <div className="cleanup-list">
                {systemFiles.map(renderItem)}
              </div>
            </div>
          )}

          {browsers.length === 0 && systemFiles.length === 0 && !scanning && (
            <div className="empty-state">
              <Monitor size={48} />
              <p>Click "Scan System" to detect cleanable files</p>
            </div>
          )}
        </>
      )}

      {activeTab === 'registry' && (
        <>
          <div className="clean-header">
            <button className="scan-btn" onClick={scanRegistryIssues} disabled={scanningRegistry}>
              <RefreshCw size={16} className={scanningRegistry ? 'spinning' : ''} />
              {scanningRegistry ? 'Scanning...' : 'Scan Registry'}
            </button>
            <button 
              className="clean-btn-primary" 
              onClick={cleanSelectedRegistry}
              disabled={cleaningRegistry || scanningRegistry || registryIssues.filter(i => i.checked).length === 0}
            >
              <Trash2 size={16} />
              {cleaningRegistry ? 'Cleaning...' : `Clean Selected (${registryIssues.filter(i => i.checked).length})`}
            </button>
          </div>

          <div className="registry-warning">
            <AlertTriangle size={18} />
            <span>Registry cleaning is safe but a backup will be created before any changes.</span>
          </div>

          {scanningRegistry ? (
            <div className="loading-state">
              <RefreshCw size={32} className="spinning" />
              <p>Scanning registry for invalid entries...</p>
            </div>
          ) : registryIssues.length === 0 ? (
            <div className="empty-state">
              <CheckCircle size={48} />
              <p>No registry issues found. Your registry is clean!</p>
            </div>
          ) : (
            <div className="cleanup-section">
              <div className="cleanup-header">
                <Database size={18} />
                <span>Registry Issues ({registryIssues.length} found)</span>
              </div>
              <div className="cleanup-list">
                {registryIssues.map((issue) => (
                  <div key={issue.id} className="cleanup-item">
                    <div className="item-left">
                      <label className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          checked={issue.checked}
                          onChange={() => toggleRegistryIssue(issue.id)}
                        />
                        <span className="checkmark"></span>
                      </label>
                      <Database size={20} className="item-icon registry" />
                      <div className="item-info">
                        <span className="item-title">{issue.name}</span>
                        <span className="item-description">{issue.category} - {issue.description}</span>
                        <span className="item-path">{issue.path}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Preview Dialog */}
      <Dialog open={showPreview} onClose={() => setShowPreview(false)} className="w-[700px] max-w-[90vw]">
        <DialogHeader onClose={() => setShowPreview(false)}>
          Pre-Clean Preview
        </DialogHeader>
        <DialogContent>
          {loadingPreview ? (
            <div className="loading-state">
              <RefreshCw size={32} className="spinning" />
              <p>Loading preview...</p>
            </div>
          ) : (
            <div className="preview-content">
              <div className="preview-summary">
                <AlertTriangle size={18} className="text-amber-500" />
                <span>The following files will be permanently deleted:</span>
              </div>
              {previewData.map((item) => (
                <div key={item.id} className="preview-category">
                  <div className="preview-category-header">
                    <span className="preview-category-name">{item.name}</span>
                    <span className="preview-category-info">
                      {item.totalFiles} files • {item.sizeFormatted}
                    </span>
                  </div>
                  <div className="preview-files">
                    {item.files.slice(0, 20).map((file, idx) => (
                      <div key={idx} className="preview-file">
                        <File size={14} />
                        <span className="preview-file-name" title={file.path}>{file.name}</span>
                        <span className="preview-file-size">{file.sizeFormatted}</span>
                      </div>
                    ))}
                    {item.files.length > 20 && (
                      <div className="preview-more">
                        ...and {item.files.length - 20} more files
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
        <DialogFooter>
          <button className="btn-secondary" onClick={() => setShowPreview(false)}>
            Cancel
          </button>
          <button className="btn-danger" onClick={cleanSelected} disabled={loadingPreview}>
            <Trash2 size={16} />
            Delete All
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Clean;
