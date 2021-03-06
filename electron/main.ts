import { app, BrowserWindow, ipcMain, Notification, dialog } from 'electron'
import isDev from 'electron-is-dev'
import log from 'electron-log'
// let eNotify
let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow() {
  // if (require('electron-squirrel-startup')) return app.quit()
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 1100,
    height: 700,
    // backgroundColor: '#fff',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
    minWidth: 800,
    minHeight: 600,
    show: false,
  })
  // mainWindow.setMenuBarVisibility(false)

  mainWindow.maximize()
  mainWindow.show()

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  }
  // import eNotify from 'electron-notify'
}

async function registerListeners() {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message)
  })
  ipcMain.on('write-log', (_, message) => {
    switch (message.level) {
      case 'info':
        return log.scope(message.scope).info(message.text)
      case 'error':
        dialog.showErrorBox(
          message.title || 'Ошибка',
          `Text: ${message.text}\nPayload: ${message.payload}`
        )
        // new Notification({
        //   title: 'Ошибка',
        //   body: message.text,
        //   silent: false,
        // }).show()
        return log
          .scope(message.scope)
          .error(`text: ${message.text}\npayload: ${message.payload}`)
    }
  })
  ipcMain.on('message', (_, message) => {
    console.log(message)
  })
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", 'example.com'],
//       objectSrc: ["'none'"],
//       upgradeInsecureRequests: [],
//     },
//   })
// )

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// app.

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", 'example.com'],
//       objectSrc: ["'none'"],
//       upgradeInsecureRequests: [],
//     },
//   })
// )
