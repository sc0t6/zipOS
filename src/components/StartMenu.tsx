import React from 'react';
import { FolderOpen, FileText, Calculator, Globe, Terminal, Settings, Info, Power, Search } from 'lucide-react';
import { AppType } from '../types/os';

interface StartMenuProps {
  onAppLaunch: (app: AppType) => void;
  onClose: () => void;
}

const apps = [
  { id: 'file-manager' as AppType, name: 'File Manager', icon: FolderOpen, color: 'text-yellow-500' },
  { id: 'text-editor' as AppType, name: 'Text Editor', icon: FileText, color: 'text-blue-500' },
  { id: 'calculator' as AppType, name: 'Calculator', icon: Calculator, color: 'text-green-500' },
  { id: 'browser' as AppType, name: 'Browser', icon: Globe, color: 'text-purple-500' },
  { id: 'terminal' as AppType, name: 'Terminal', icon: Terminal, color: 'text-gray-700' },
  { id: 'settings' as AppType, name: 'Settings', icon: Settings, color: 'text-gray-600' },
  { id: 'about' as AppType, name: 'About zipOS', icon: Info, color: 'text-blue-600' },
];

export function StartMenu({ onAppLaunch, onClose }: StartMenuProps) {
  const handleAppClick = (app: AppType) => {
    onAppLaunch(app);
    onClose();
  };

  return (
    <div className="absolute top-10 left-4 w-80 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 overflow-hidden text-white">
      {/* Search */}
      <div className="p-3 border-b border-white/10">
        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-white/60" />
          <input
            type="text"
            placeholder="Search apps..."
            className="flex-1 bg-transparent outline-none text-sm placeholder-white/40 text-white"
          />
        </div>
      </div>

      {/* Apps List */}
      <div className="p-2">
        <div className="mb-2 text-xs text-white/50 px-2">Applications</div>
        <div className="space-y-1">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => handleAppClick(app.id)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm">{app.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-white/10">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm">
          <Power className="w-4 h-4" />
          <span>Power</span>
        </button>
      </div>
    </div>
  );
}
