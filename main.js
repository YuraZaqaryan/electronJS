const { app, BrowserWindow } = require('electron')
const path = require('path')

let win;

function createWindow () {
   win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'img/icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html');

  // win.webContents.openDevTools();
  
  win.on('closed', () => {
    win = null;
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
