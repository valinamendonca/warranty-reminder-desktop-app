const { app, BrowserWindow, Tray, Menu, Notification } = require('electron');
const path = require('path');
const axios = require('axios');
const AutoLaunch = require('electron-auto-launch');
const { spawn } = require('child_process');
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");

let mainWindow;
let tray;

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';


function checkWarrantiesForToday() {
  axios.get('http://localhost:8080/api/reminder')
    .then((response) => {
      const today = new Date().toISOString().split('T')[0];

      response.data.forEach((item) => {
        const reminderDate = item.reminderDate?.replace(/"/g, "");
        const dateOnly = new Date(reminderDate).toISOString().split('T')[0];

        console.log(`Item: ${item.itemName}, Reminder Date: ${dateOnly}, Today: ${today}`);

        if (dateOnly === today) {
          new Notification({
            title: 'Reminder',
            body: `Reminder for ${item.itemName} is scheduled for today.`,
          }).show();
        }
      });
    })
    .catch((err) => {
      console.error("Reminder check failed:", err);
    });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });

  mainWindow.loadURL(`file://${path.join(__dirname, 'frontend', 'dist', 'index.html')}`);
  // mainWindow.loadFile(path.join(__dirname, 'frontend/dist/index.html'));

  mainWindow.on('close', (event) => {
    event.preventDefault();
    mainWindow.hide();
  });
}

function startBackend() {
  const isDev = !app.isPackaged;

  const java = isDev
    ? path.join(__dirname, 'jre', 'bin', 'java')
    : path.join(process.resourcesPath, 'jre', 'bin', 'java');

  const jarPath = isDev
    ? path.join(__dirname, 'backend-0.0.1-SNAPSHOT.jar')
    : path.join(process.resourcesPath, 'backend-0.0.1-SNAPSHOT.jar');

  const backend = spawn(java, ['-jar', jarPath], {
    cwd: isDev ? __dirname : process.resourcesPath
  });

  backend.stdout.on('data', data => console.log(`Backend: ${data}`));
  backend.stderr.on('data', data => console.error(`Backend error: ${data}`));
}

app.whenReady().then(() => {
  createWindow();
  // Start the backend server
  startBackend();

  // Check for updates
  autoUpdater.checkForUpdatesAndNotify();

  // Check for renewal reminders every day
  checkWarrantiesForToday();
  setInterval(checkWarrantiesForToday, 24 * 60 * 60 * 1000);

  const launchedByUser = !app.getLoginItemSettings().wasOpenedAsHidden;

  if (launchedByUser) {
    mainWindow.show();
  }

  tray = new Tray(path.join(__dirname, 'icon.png'));
  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {
        mainWindow.show();
      },
    },
    {
      label: 'Quit',
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setToolTip('Warranty Reminder App');
  tray.setContextMenu(trayMenu);

  const autoLauncher = new AutoLaunch({
    name: 'WarrantyReminderApp',
    path: app.getPath('exe'),
  });

  autoLauncher.isEnabled().then((isEnabled) => {
    if (!isEnabled) {
      autoLauncher.enable().catch((err) =>
        console.error('AutoLaunch Enable Error:', err)
      );
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // Intentionally keep the app running in background
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
