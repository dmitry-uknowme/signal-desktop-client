/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs'
import electron, { contextBridge, app, BrowserWindow } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { io } from 'socket.io-client'

// Custom APIs for renderer

const getHomeDir = (): string => process.env.HOME as string
const getAppDir = (): string => `${getHomeDir()}/.signal`

const socket = io('http://localhost:9000', {
  reconnectionDelayMax: 10000,
  auth: {
    token: '123'
  },
  query: {
    'my-key': 'my-value'
  }
})

socket.emit('data', 'messageeeee')

const api = {
  test: (callback: any) => {
    callback(app)
    // return { app: app.getAppVersion() }
  },
  getSettings: (): string => {
    const APP_DIR = getAppDir()
    const settings = JSON.parse(fs.readFileSync(`${APP_DIR}/settings.json`, 'utf8'))
    return settings
  },
  // getSettings: (callback): any => {
  //   const APP_DIR = getAppDir()
  //   const settings = JSON.parse(fs.readFileSync(`${APP_DIR}/settings.json`, 'utf8'))
  //   callback(settings)
  // },
  changeSettingsByKey: (key: string, value: string): void => {
    const APP_DIR = getAppDir()
    const settings = JSON.parse(fs.readFileSync(`${APP_DIR}/settings.json`, 'utf8'))
    // console.log('beforeeee', settings)
    settings[key] = value
    // console.log('afterrrr', settings)
    fs.writeFileSync(`${APP_DIR}/settings.json`, JSON.stringify(settings, null, 2))
    // app.relaunch()

    electron.BrowserWindow.getAllWindows()[0].reload()
  },

  restartApp: () => {
    electron.BrowserWindow.getAllWindows()[0].reload()
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
