// import { ipcRenderer } from 'electron';
import { useEffect } from 'react';
import { IPCRendererEventsMap } from 'renderer/ipc';

export default function useIPCEventListener<
  K extends keyof IPCRendererEventsMap
>(channel: K, listener: (payload: IPCRendererEventsMap[K]) => void) {
  useEffect(
    () => window.electron.ipcRenderer.on(channel, listener),
    [channel, listener]
  );
}
