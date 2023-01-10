export enum IPCMainEvents {
  OPEN_IMAGE_PICK_DIALOG = 'open:dialog',
}

export interface FilePathObjectCollection {
  [key: string]: FilePathObject[];
}

export interface FilePathObject {
  path: string;
  name: string;
  ext: string;
  stats: Stats;
}

export interface StatsBase<T> {
  isFile(): boolean;
  isDirectory(): boolean;
  isBlockDevice(): boolean;
  isCharacterDevice(): boolean;
  isSymbolicLink(): boolean;
  isFIFO(): boolean;
  isSocket(): boolean;
  dev: T;
  ino: T;
  mode: T;
  nlink: T;
  uid: T;
  gid: T;
  rdev: T;
  size: T;
  blksize: T;
  blocks: T;
  atimeMs: T;
  mtimeMs: T;
  ctimeMs: T;
  birthtimeMs: T;
  atime: Date;
  mtime: Date;
  ctime: Date;
  birthtime: Date;
}

export type Stats = StatsBase<number>;

export enum IPCRendererEvents {
  ADD_PATHS = 'ipc:renderer:paths:add',
}

export interface IPCRendererEventsMap {
  [IPCRendererEvents.ADD_PATHS]: any;
}
