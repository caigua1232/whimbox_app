import { app, BrowserWindow } from 'electron'
import { join } from 'node:path'

import type { WindowProps } from 'shared/types'

import { registerRoute } from 'lib/electron-router-dom'

function shouldUseRendererDevServer() {
  return !app.isPackaged && process.env.NODE_ENV === 'development'
}

export function createWindow({ id, ...settings }: WindowProps) {
  const window = new BrowserWindow(settings)
  const htmlFile = join(__dirname, '../renderer/index.html')

  if (shouldUseRendererDevServer()) {
    registerRoute({
      id,
      browserWindow: window,
      htmlFile,
    })
  } else {
    void window.loadFile(htmlFile, { hash: `/${id}` })
  }

  window.on('closed', window.destroy)

  return window
}
