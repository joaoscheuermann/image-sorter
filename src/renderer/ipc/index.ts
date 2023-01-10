export enum IPCRendererEvents {
  ADD_PATHS = 'ipc:renderer:paths:add',
}

export interface IPCRendererEventsMap {
  [IPCRendererEvents.ADD_PATHS]: any;
}
