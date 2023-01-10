import fs, { Stats } from 'fs';
import path from 'path';
import { BrowserWindow, dialog, ipcMain } from 'electron';
import {
  FilePathObjectCollection,
  FilePathObject,
  IPCMainEvents,
  IPCRendererEvents,
} from '../../types';

export function displayImagePickDialog() {
  return dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [
      {
        name: 'All',
        extensions: ['jpg', 'png', 'cr3', 'raw', 'tiff'],
      },
      {
        name: 'Cannon',
        extensions: ['jpg', 'cr3'],
      },
    ],
  });
}

export function createFilePathObject(
  filePath: string,
  name: string,
  ext: string,
  stats: Stats
): FilePathObject {
  return { path: filePath, name, ext, stats };
}

export function groupPathsWithSameName(filePaths: string[]) {
  return filePaths.reduce((accumulator, filePath) => {
    const { name, ext } = path.parse(filePath);

    const stats = fs.statSync(filePath);
    const obj = createFilePathObject(filePath, name, ext, stats);

    return {
      ...accumulator,
      [name]: accumulator[name] ? [...accumulator[name], obj] : [obj],
    };
  }, {} as FilePathObjectCollection);
}

export default function initializeIPCListeners(browserWindow: BrowserWindow) {
  ipcMain.addListener(IPCMainEvents.OPEN_IMAGE_PICK_DIALOG, async () => {
    const { canceled, filePaths } = await displayImagePickDialog();

    if (canceled) return;

    browserWindow.webContents.send(
      IPCRendererEvents.ADD_PATHS,
      groupPathsWithSameName(filePaths)
    );
  });
}
