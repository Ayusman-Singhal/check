import React, { useState, useEffect, useRef } from 'react';
import {
  IconCpu,
  IconBattery,
  IconWifi,
  IconRefresh,
  IconPlayerPlay,
  IconBolt,
  IconLeaf,
  IconFlame,
  IconTrash,
  IconNetwork,
  IconLoader2,
  IconCheck,
  IconAlertTriangle
} from '@tabler/icons-react';
import './Optimize.css';

const { ipcRenderer } = window.require('electron');

interface RamUsage {
  total: number;
  used: number;
  free: number;
  available: number;
  usedPercent: string;
  totalFormatted: string;
  usedFormatted: string;
  availableFormatted: string;
}

interface MemoryProcess {
  pid: number;
  name: string;
  memoryFormatted: string;
  memoryPercent: string;
  cpu: string;
}

interface PowerPlan {
  guid: string;
  name: string;
  active: boolean;
}

interface BatteryStatus {
  hasBattery: boolean;
  isCharging: boolean;
  percent: number;
  acConnected: boolean;
  capacityPercent: string;
}

const Optimize: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ram' | 'battery' | 'network'>('ram');
  
  // RAM state
  const [ramUsage, setRamUsage] = useState<RamUsage | null>(null);
  const [ramHistory, setRamHistory] = useState<number[]>([]);
  const [topProcesses, setTopProcesses] = useState<MemoryProcess[]>([]);
  const [optimizingRam, setOptimizingRam] = useState(false);
  
  // Battery state
  const [powerPlans, setPowerPlans] = useState<PowerPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<string>('');
  const [batteryStatus, setBatteryStatus] = useState<BatteryStatus | null>(null);
  const [bgProcesses, setBgProcesses] = useState<any[]>([]);
  const [throttling, setThrottling] = useState(false);
  const [changingPlan, setChangingPlan] = useState(false);
  
  // Network state
  const [networkStatus, setNetworkStatus] = useState<any>(null);
  const [networkAction, setNetworkAction] = useState<string | null>(null);
  const [actionResult, setActionResult] = useState<{ success: boolean; message: string } | null>(null);

  const ramIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // RAM monitoring
  const fetchRamUsage = async () => {
    const result = await ipcRenderer.invoke('get-ram-usage');
    if (result.success) {
      setRamUsage(result.data);
      setRamHistory(prev => {
        const newHistory = [...prev, parseFloat(result.data.usedPercent)];
        return newHistory.slice(-30); // Keep last 30 data points
      });
    }
  };

  const fetchTopProcesses = async () => {
    const result = await ipcRenderer.invoke('get-top-memory-processes', 8);
    if (result.success) {
      setTopProcesses(result.data);
    }
  };

  const handleOptimizeRam = async () => {
    setOptimizingRam(true);
    await ipcRenderer.invoke('optimize-ram');
    await fetchRamUsage();
    await fetchTopProcesses();
    setOptimizingRam(false);
  };

  // Battery functions
  const fetchPowerPlans = async () => {
    const result = await ipcRenderer.invoke('get-power-plans');
    if (result.success) {
      setPowerPlans(result.data.plans);
      setCurrentPlan(result.data.current.name);
    }
  };

  const fetchBatteryStatus = async () => {
    const result = await ipcRenderer.invoke('get-battery-status');
    if (result.success) {
      setBatteryStatus(result.data);
    }
  };

  const fetchBgProcesses = async () => {
    const result = await ipcRenderer.invoke('get-background-processes');
    if (result.success) {
      setBgProcesses(result.data);
    }
  };

  const handleSetPowerPlan = async (planType: string) => {
    setChangingPlan(true);
    await ipcRenderer.invoke('set-power-plan', planType);
    await fetchPowerPlans();
    setChangingPlan(false);
  };

  const handleThrottleProcesses = async () => {
    setThrottling(true);
    await ipcRenderer.invoke('throttle-background-processes');
    await fetchBgProcesses();
    setThrottling(false);
  };

  // Network functions
  const fetchNetworkStatus = async () => {
    const result = await ipcRenderer.invoke('get-network-status');
    if (result.success) {
      setNetworkStatus(result.data);
    }
  };

  const handleNetworkAction = async (action: string) => {
    setNetworkAction(action);
    setActionResult(null);
    
    let result;
    switch (action) {
      case 'flush-dns':
        result = await ipcRenderer.invoke('flush-dns');
        break;
      case 'reset-winsock':
        result = await ipcRenderer.invoke('reset-winsock');
        break;
      case 'reset-adapter':
        result = await ipcRenderer.invoke('reset-network-adapter');
        break;
      case 'reset-tcp':
        result = await ipcRenderer.invoke('reset-tcp-ip');
        break;
    }
    
    setActionResult(result);
    setNetworkAction(null);
    await fetchNetworkStatus();
  };

  // Effects
  useEffect(() => {
    if (activeTab === 'ram') {
      fetchRamUsage();
      fetchTopProcesses();
      ramIntervalRef.current = setInterval(fetchRamUsage, 2000);
    } else if (activeTab === 'battery') {
      fetchPowerPlans();
      fetchBatteryStatus();
      fetchBgProcesses();
    } else if (activeTab === 'network') {
      fetchNetworkStatus();
    }

    return () => {
      if (ramIntervalRef.current) {
        clearInterval(ramIntervalRef.current);
      }
    };
  }, [activeTab]);

  const getPlanIcon = (planName: string) => {
    const lower = planName.toLowerCase();
    if (lower.includes('power saver') || lower.includes('saver')) return <IconLeaf size={20} />;
    if (lower.includes('high') || lower.includes('ultimate')) return <IconFlame size={20} />;
    return <IconBolt size={20} />;
  };

  const getPlanType = (planName: string) => {
    const lower = planName.toLowerCase();
    if (lower.includes('power saver') || lower.includes('saver')) return 'power-saver';
    if (lower.includes('high') || lower.includes('ultimate')) return 'high-performance';
    return 'balanced';
  };

  return (
    <div className="optimize-panel">
      <div className="optimize-header">
        <h1 className="optimize-title">System Optimization</h1>
        <p className="optimize-subtitle">Boost performance, save battery, and optimize network</p>
      </div>

      <div className="optimize-tabs">
        <button
          className={`optimize-tab ${activeTab === 'ram' ? 'active' : ''}`}
          onClick={() => setActiveTab('ram')}
        >
          <IconCpu size={18} />
          RAM Optimizer
        </button>
        <button
          className={`optimize-tab ${activeTab === 'battery' ? 'active' : ''}`}
          onClick={() => setActiveTab('battery')}
        >
          <IconBattery size={18} />
          Battery Saver
        </button>
        <button
          className={`optimize-tab ${activeTab === 'network' ? 'active' : ''}`}
          onClick={() => setActiveTab('network')}
        >
          <IconWifi size={18} />
          Network
        </button>
      </div>

      {/* RAM Optimizer Tab */}
      {activeTab === 'ram' && (
        <div className="tab-content">
          <div className="ram-overview">
            <div className="ram-stats">
              <div className="ram-circle">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" className="ram-circle-bg" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    className="ram-circle-fill"
                    strokeDasharray={`${(parseFloat(ramUsage?.usedPercent || '0') / 100) * 283} 283`}
                  />
                </svg>
                <div className="ram-circle-text">
                  <span className="ram-percent">{ramUsage?.usedPercent || 0}%</span>
                  <span className="ram-label">Used</span>
                </div>
              </div>
              <div className="ram-details">
                <div className="ram-detail-row">
                  <span>Total</span>
                  <span>{ramUsage?.totalFormatted || '0 B'}</span>
                </div>
                <div className="ram-detail-row">
                  <span>Used</span>
                  <span>{ramUsage?.usedFormatted || '0 B'}</span>
                </div>
                <div className="ram-detail-row">
                  <span>Available</span>
                  <span>{ramUsage?.availableFormatted || '0 B'}</span>
                </div>
              </div>
            </div>

            <div className="ram-graph">
              <div className="graph-header">
                <span>RAM Usage History</span>
                <button className="optimize-btn" onClick={handleOptimizeRam} disabled={optimizingRam}>
                  {optimizingRam ? <IconLoader2 size={16} className="spinning" /> : <IconTrash size={16} />}
                  {optimizingRam ? 'Optimizing...' : 'Optimize RAM'}
                </button>
              </div>
              <div className="graph-container">
                <svg viewBox="0 0 300 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="ramGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {ramHistory.length > 1 && (
                    <>
                      <path
                        d={`M 0 ${100 - ramHistory[0]} ${ramHistory.map((v, i) => `L ${(i / (ramHistory.length - 1)) * 300} ${100 - v}`).join(' ')} L 300 100 L 0 100 Z`}
                        fill="url(#ramGradient)"
                      />
                      <path
                        d={`M 0 ${100 - ramHistory[0]} ${ramHistory.map((v, i) => `L ${(i / (ramHistory.length - 1)) * 300} ${100 - v}`).join(' ')}`}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                    </>
                  )}
                </svg>
              </div>
            </div>
          </div>

          <div className="processes-section">
            <div className="section-header">
              <h3>Top Memory Consumers</h3>
              <button className="refresh-btn" onClick={fetchTopProcesses}>
                <IconRefresh size={16} />
              </button>
            </div>
            <div className="processes-list">
              {topProcesses.map((proc) => (
                <div key={proc.pid} className="process-item">
                  <div className="process-info">
                    <span className="process-name">{proc.name}</span>
                    <span className="process-pid">PID: {proc.pid}</span>
                  </div>
                  <div className="process-stats">
                    <span className="process-memory">{proc.memoryFormatted}</span>
                    <div className="process-bar">
                      <div 
                        className="process-bar-fill" 
                        style={{ width: `${Math.min(parseFloat(proc.memoryPercent), 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Battery Saver Tab */}
      {activeTab === 'battery' && (
        <div className="tab-content">
          {batteryStatus && (
            <div className="battery-status">
              <div className="battery-indicator">
                <div className="battery-icon">
                  <div className="battery-level" style={{ width: `${batteryStatus.percent}%` }} />
                </div>
                <span className="battery-percent">{batteryStatus.percent}%</span>
                {batteryStatus.isCharging && <IconBolt size={16} className="charging-icon" />}
              </div>
              <span className="battery-label">
                {batteryStatus.isCharging ? 'Charging' : batteryStatus.acConnected ? 'Plugged in' : 'On Battery'}
              </span>
            </div>
          )}

          <div className="power-plans-section">
            <h3>Power Plans</h3>
            <p className="section-desc">Select a power plan to optimize battery life or performance</p>
            <div className="power-plans">
              {powerPlans.map((plan) => (
                <button
                  key={plan.guid}
                  className={`power-plan-btn ${plan.active ? 'active' : ''}`}
                  onClick={() => handleSetPowerPlan(getPlanType(plan.name))}
                  disabled={changingPlan}
                >
                  {getPlanIcon(plan.name)}
                  <span>{plan.name}</span>
                  {plan.active && <IconCheck size={16} className="check-icon" />}
                </button>
              ))}
            </div>
          </div>

          <div className="throttle-section">
            <div className="section-header">
              <div>
                <h3>Background Process Throttling</h3>
                <p className="section-desc">Reduce priority of background apps to save energy</p>
              </div>
              <button className="optimize-btn" onClick={handleThrottleProcesses} disabled={throttling}>
                {throttling ? <IconLoader2 size={16} className="spinning" /> : <IconLeaf size={16} />}
                {throttling ? 'Throttling...' : 'Throttle All'}
              </button>
            </div>
            <div className="bg-processes">
              {bgProcesses.length === 0 ? (
                <div className="empty-state small">
                  <p>No throttleable background processes found</p>
                </div>
              ) : (
                bgProcesses.map((proc) => (
                  <div key={proc.pid} className="bg-process-item">
                    <span className="process-name">{proc.name}</span>
                    <span className="process-cpu">CPU: {proc.cpu}%</span>
                    <span className="process-memory">{proc.memory}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Network Tab */}
      {activeTab === 'network' && (
        <div className="tab-content">
          {actionResult && (
            <div className={`action-result ${actionResult.success ? 'success' : 'error'}`}>
              {actionResult.success ? <IconCheck size={18} /> : <IconAlertTriangle size={18} />}
              <span>{actionResult.message || (actionResult.success ? 'Operation completed' : 'Operation failed')}</span>
            </div>
          )}

          <div className="network-actions">
            <h3>Network Optimization Tools</h3>
            <div className="action-grid">
              <button 
                className="action-card"
                onClick={() => handleNetworkAction('flush-dns')}
                disabled={networkAction !== null}
              >
                <IconTrash size={24} />
                <span className="action-title">Flush DNS Cache</span>
                <span className="action-desc">Clear DNS resolver cache</span>
                {networkAction === 'flush-dns' && <IconLoader2 size={16} className="spinning action-loader" />}
              </button>

              <button 
                className="action-card"
                onClick={() => handleNetworkAction('reset-winsock')}
                disabled={networkAction !== null}
              >
                <IconNetwork size={24} />
                <span className="action-title">Reset Winsock</span>
                <span className="action-desc">Reset Windows Sockets API</span>
                {networkAction === 'reset-winsock' && <IconLoader2 size={16} className="spinning action-loader" />}
              </button>

              <button 
                className="action-card"
                onClick={() => handleNetworkAction('reset-adapter')}
                disabled={networkAction !== null}
              >
                <IconWifi size={24} />
                <span className="action-title">Reset Adapter</span>
                <span className="action-desc">Refresh network adapters</span>
                {networkAction === 'reset-adapter' && <IconLoader2 size={16} className="spinning action-loader" />}
              </button>

              <button 
                className="action-card"
                onClick={() => handleNetworkAction('reset-tcp')}
                disabled={networkAction !== null}
              >
                <IconRefresh size={24} />
                <span className="action-title">Reset TCP/IP</span>
                <span className="action-desc">Reset TCP/IP stack</span>
                {networkAction === 'reset-tcp' && <IconLoader2 size={16} className="spinning action-loader" />}
              </button>
            </div>
          </div>

          {networkStatus && networkStatus.interfaces.length > 0 && (
            <div className="network-info">
              <h3>Active Network Interfaces</h3>
              <div className="interfaces-list">
                {networkStatus.interfaces.map((iface: any, idx: number) => (
                  <div key={idx} className="interface-card">
                    <div className="interface-header">
                      <IconWifi size={18} />
                      <span>{iface.name}</span>
                      <span className="interface-type">{iface.type}</span>
                    </div>
                    <div className="interface-details">
                      <div className="detail-row">
                        <span>IP Address</span>
                        <span>{iface.ip4 || 'N/A'}</span>
                      </div>
                      <div className="detail-row">
                        <span>MAC Address</span>
                        <span>{iface.mac}</span>
                      </div>
                      <div className="detail-row">
                        <span>Speed</span>
                        <span>{iface.speed ? `${iface.speed} Mbps` : 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Optimize;
