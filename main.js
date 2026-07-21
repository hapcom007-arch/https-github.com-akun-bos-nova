const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    x: width - 1020, // Pojok kanan
    y: 20,
    frame: false, // Menghilangkan border dan title bar Windows (Khas Antigravity)
    transparent: true, // Latar belakang transparan
    alwaysOnTop: true, // Selalu di atas aplikasi lain (Dewa Windows)
    skipTaskbar: true, // Bisa disembunyikan dari taskbar jika mau (Ghost mode)
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Tembus klik di bagian transparan jika dibutuhkan (Opsional, matikan jika ingin UI bisa di-klik normal)
  // mainWindow.setIgnoreMouseEvents(true, { forward: true });

  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));
  
  // Mencegah window ditutup secara tidak sengaja (Ghost Protocol)
  mainWindow.on('close', (e) => {
    e.preventDefault();
    mainWindow.hide(); 
    console.log('[NOVA] Bersembunyi di balik bayangan...');
  });
}

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
