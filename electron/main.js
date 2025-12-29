const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';
const { scanAll, cleanItems, moveToTrash, getCleanupPreview } = require('./cleanupScanner');
const { getStartupApps, toggleStartupApp, scanLargestFiles, deleteFile } = require('./systemScanner');
const { getSystemInfo, exportToJSON, exportToText, exportToPDF } = require('./systemInfo');
const { scanRegistry, cleanRegistryIssues } = require('./registryCleaner');
const optimizer = require('./optimizer');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
    backgroundColor: '#ffffff',
    show: false,
  });

  // Load the app
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// App lifecycle
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers
ipcMain.handle('get-app-info', async () => {
  return {
    name: app.getName(),
    version: app.getVersion(),
    platform: process.platform,
  };
});

ipcMain.handle('minimize-window', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.handle('maximize-window', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.handle('close-window', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

// Cleanup scanner handlers
ipcMain.handle('scan-system', async () => {
  try {
    const result = await scanAll();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('clean-items', async (event, items) => {
  try {
    const result = await cleanItems(items);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('move-to-trash', async (event, filePath) => {
  try {
    const result = await moveToTrash(filePath);
    return { success: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// System scanner handlers
ipcMain.handle('get-startup-apps', async () => {
  try {
    const apps = await getStartupApps();
    return { success: true, data: apps };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('toggle-startup-app', async (event, app, enabled) => {
  try {
    const result = await toggleStartupApp(app, enabled);
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('scan-largest-files', async (event, limit = 10) => {
  try {
    const files = await scanLargestFiles(null, limit);
    return { success: true, data: files };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('open-file-location', async (event, filePath) => {
  try {
    shell.showItemInFolder(filePath);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('delete-file', async (event, filePath) => {
  try {
    const result = await deleteFile(filePath);
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// System info handlers
ipcMain.handle('get-system-info', async () => {
  try {
    const info = await getSystemInfo();
    return { success: true, data: info };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('export-system-info-json', async (event, systemInfo) => {
  try {
    const result = await exportToJSON(systemInfo, mainWindow);
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('export-system-info-text', async (event, systemInfo) => {
  try {
    const result = await exportToText(systemInfo, mainWindow);
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('export-system-info-pdf', async (event, systemInfo) => {
  try {
    const result = await exportToPDF(systemInfo, mainWindow);
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
});


// Registry cleaner handlers
ipcMain.handle('scan-registry', async () => {
  try {
    const issues = await scanRegistry();
    return { success: true, data: issues };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('clean-registry', async (event, issues) => {
  try {
    const result = await cleanRegistryIssues(issues);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Cleanup preview handler
ipcMain.handle('get-cleanup-preview', async (event, items) => {
  try {
    const preview = await getCleanupPreview(items);
    return { success: true, data: preview };
  } catch (error) {
    return { success: false, error: error.message };
  }
});


// ==================== OPTIMIZER HANDLERS ====================

// RAM Optimizer
ipcMain.handle('get-ram-usage', async () => {
  try {
    const usage = await optimizer.getRamUsage();
    return { success: true, data: usage };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-top-memory-processes', async (event, limit = 10) => {
  try {
    const processes = await optimizer.getTopMemoryProcesses(limit);
    return { success: true, data: processes };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('optimize-ram', async () => {
  try {
    const result = await optimizer.optimizeRam();
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Battery Saver
ipcMain.handle('get-power-plans', async () => {
  try {
    const plans = await optimizer.getPowerPlans();
    const current = await optimizer.getCurrentPowerPlan();
    return { success: true, data: { plans, current } };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('set-power-plan', async (event, planType) => {
  try {
    const result = await optimizer.setPowerPlan(planType);
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-battery-status', async () => {
  try {
    const status = await optimizer.getBatteryStatus();
    return { success: true, data: status };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-background-processes', async () => {
  try {
    const processes = await optimizer.getBackgroundProcesses();
    return { success: true, data: processes };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('throttle-background-processes', async () => {
  try {
    const result = await optimizer.throttleBackgroundProcesses();
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Network Optimizer
ipcMain.handle('flush-dns', async () => {
  try {
    const result = await optimizer.flushDnsCache();
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('reset-winsock', async () => {
  try {
    const result = await optimizer.resetWinsock();
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('reset-network-adapter', async () => {
  try {
    const result = await optimizer.resetNetworkAdapter();
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('reset-tcp-ip', async () => {
  try {
    const result = await optimizer.resetTcpIp();
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-network-status', async () => {
  try {
    const status = await optimizer.getNetworkStatus();
    return { success: true, data: status };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
