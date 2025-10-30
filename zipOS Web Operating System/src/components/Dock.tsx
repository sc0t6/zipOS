import React from 'react';
import { FolderOpen, FileText, Calculator, Globe, Terminal, Settings, Info, Mail, Image, Music, Calendar, MapPin, FileEdit, Grid3x3, LayoutGrid, Store } from 'lucide-react';
import { Window as WindowType, AppType } from '../types/os';

interface DockProps {
  windows: WindowType[];
  pinnedApps: AppType[];
  onAppLaunch: (app: AppType) => void;
  onWindowClick: (id: string) => void;
  onPinApp: (app: AppType) => void;
  onUnpinApp: (app: AppType) => void;
  accentColor?: string;
}

const appConfig: Record<AppType, { icon: React.ComponentType<{ className?: string }>, name: string }> = {
  'file-manager': { icon: FolderOpen, name: 'File Manager' },
  'text-editor': { icon: FileText, name: 'Text Editor' },
  'calculator': { icon: Calculator, name: 'Calculator' },
  'browser': { icon: Globe, name: 'Browser' },
  'terminal': { icon: Terminal, name: 'Terminal' },
  'settings': { icon: Settings, name: 'Settings' },
  'about': { icon: Info, name: 'About' },
  'app-store': { icon: Store, name: 'App Store' },
  'app-library': { icon: LayoutGrid, name: 'App Library' },
  'mail': { icon: Mail, name: 'Mail' },
  'photos': { icon: Image, name: 'Photos' },
  'music': { icon: Music, name: 'Music' },
  'notes': { icon: FileEdit, name: 'Notes' },
  'calendar': { icon: Calendar, name: 'Calendar' },
  'maps': { icon: MapPin, name: 'Maps' },
};

export function Dock({ windows, pinnedApps, onAppLaunch, onWindowClick, onPinApp, onUnpinApp, accentColor = 'red' }: DockProps) {
  // Get unique apps that are running
  const runningApps = Array.from(new Set(windows.map(w => w.app)));
  
  // Combine pinned apps with running apps (avoid duplicates)
  const dockApps = [...new Set([...pinnedApps, ...runningApps])];

  const accentColors: Record<string, string> = {
    red: '#ef4444',
    blue: '#3b82f6',
    purple: '#a855f7',
    green: '#22c55e',
    orange: '#f97316',
    pink: '#ec4899',
  };

  const handleAppClick = (app: AppType) => {
    // Find if this app has any windows
    const appWindows = windows.filter(w => w.app === app);
    
    if (appWindows.length > 0) {
      // If minimized, restore the first one; otherwise focus the first one
      const firstWindow = appWindows[0];
      onWindowClick(firstWindow.id);
    } else {
      // Launch new window
      onAppLaunch(app);
    }
  };

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-40">
      <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl px-2 py-2 border border-white/10 shadow-2xl">
        <div className="flex items-end gap-1">
          {dockApps.map((app) => {
            const config = appConfig[app];
            const Icon = config.icon;
            const appWindows = windows.filter(w => w.app === app);
            const hasWindows = appWindows.length > 0;
            const isMinimized = appWindows.every(w => w.isMinimized);

            return (
              <div key={app} className="relative group">
                <button
                  onClick={() => handleAppClick(app)}
                  className="w-14 h-14 rounded-xl flex items-center justify-center transition-all hover:scale-110 relative"
                  style={{ backgroundColor: accentColors[accentColor] }}
                  title={config.name}
                >
                  <Icon className="w-7 h-7 text-white" />
                  
                  {/* Running indicator */}
                  {hasWindows && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                  )}
                </button>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {config.name}
                </div>
              </div>
            );
          })}

          {/* Separator */}
          <div className="w-px h-12 bg-white/20 mx-1"></div>

          {/* App Library */}
          <div className="relative group">
            <button
              onClick={() => onAppLaunch('app-library')}
              className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 flex items-center justify-center transition-all hover:scale-110"
              title="App Library (F4)"
            >
              <Grid3x3 className="w-7 h-7 text-white" />
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              App Library
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
