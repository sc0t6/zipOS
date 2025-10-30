import React from 'react';
import { Menu, FolderOpen, FileText, Calculator, Globe, Terminal, Settings, Info, Wifi, Volume2, Battery } from 'lucide-react';
import { Window as WindowType, AppType } from '../types/os';

interface TaskbarProps {
  windows: WindowType[];
  onStartMenuToggle: () => void;
  onWindowClick: (id: string) => void;
  isStartMenuOpen: boolean;
}

const appIcons: Record<AppType, React.ComponentType<{ className?: string }>> = {
  'file-manager': FolderOpen,
  'text-editor': FileText,
  'calculator': Calculator,
  'browser': Globe,
  'terminal': Terminal,
  'settings': Settings,
  'about': Info,
};

export function Taskbar({ windows, onStartMenuToggle, onWindowClick, isStartMenuOpen }: TaskbarProps) {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-900/90 backdrop-blur-lg border-t border-gray-700 flex items-center px-2 gap-2">
      {/* Start Button */}
      <button
        onClick={onStartMenuToggle}
        className={`w-10 h-10 rounded flex items-center justify-center transition-colors ${
          isStartMenuOpen ? 'bg-blue-500 text-white' : 'hover:bg-gray-700 text-gray-300'
        }`}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Separator */}
      <div className="w-px h-8 bg-gray-700"></div>

      {/* Open Windows */}
      <div className="flex-1 flex items-center gap-1 overflow-x-auto">
        {windows
          .filter((w) => !w.isMinimized)
          .map((window) => {
            const Icon = appIcons[window.app];
            return (
              <button
                key={window.id}
                onClick={() => onWindowClick(window.id)}
                className="flex items-center gap-2 px-3 h-9 rounded bg-gray-700 hover:bg-gray-600 text-white transition-colors text-sm min-w-max"
              >
                <Icon className="w-4 h-4" />
                <span className="max-w-32 truncate">{window.title}</span>
              </button>
            );
          })}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-3 text-gray-300">
        <Wifi className="w-4 h-4" />
        <Volume2 className="w-4 h-4" />
        <Battery className="w-4 h-4" />
        
        {/* Clock */}
        <div className="text-xs text-center ml-2">
          <div>{timeString}</div>
          <div className="text-gray-400">{dateString}</div>
        </div>
      </div>
    </div>
  );
}
