export interface Window {
  id: string;
  title: string;
  app: AppType;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  data?: any;
}

export type AppType = 
  | 'file-manager' 
  | 'text-editor' 
  | 'calculator' 
  | 'browser' 
  | 'terminal' 
  | 'settings' 
  | 'about'
  | 'app-store'
  | 'app-library'
  | 'mail'
  | 'photos'
  | 'music'
  | 'notes'
  | 'calendar'
  | 'maps';

export interface DesktopIcon {
  id: string;
  name: string;
  icon: string;
  app: AppType;
}

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
}

export interface SystemTheme {
  mode: 'light' | 'dark';
  accentColor: string;
  wallpaper: string;
}

export interface InstalledApp {
  id: string;
  name: string;
  app: AppType;
  icon: string;
  version: string;
  size: string;
  installed: boolean;
}
