import React, { useEffect, useRef } from 'react';
import { RefreshCw, Monitor, Settings, FolderPlus, FilePlus } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onRefresh: () => void;
  onSettings: () => void;
  onCreateFolder?: () => void;
  onCreateFile?: () => void;
}

export function ContextMenu({ x, y, onClose, onRefresh, onSettings, onCreateFolder, onCreateFile }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed bg-gray-900/95 backdrop-blur-xl rounded-lg shadow-xl border border-white/10 py-1 min-w-48 z-50 text-white"
      style={{ left: x, top: y }}
    >
      <div className="px-3 py-1 text-xs text-gray-400">New</div>
      {onCreateFolder && (
        <button
          onClick={() => {
            onCreateFolder();
            onClose();
          }}
          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 text-sm text-left transition-colors"
        >
          <FolderPlus className="w-4 h-4" />
          Folder
        </button>
      )}
      {onCreateFile && (
        <button
          onClick={() => {
            onCreateFile();
            onClose();
          }}
          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 text-sm text-left transition-colors"
        >
          <FilePlus className="w-4 h-4" />
          File
        </button>
      )}
      <div className="h-px bg-white/10 my-1"></div>
      <button
        onClick={() => {
          onRefresh();
          onClose();
        }}
        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 text-sm text-left transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Refresh
      </button>
      <div className="h-px bg-white/10 my-1"></div>
      <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 text-sm text-left transition-colors">
        <Monitor className="w-4 h-4" />
        Change Desktop Background
      </button>
      <button
        onClick={() => {
          onSettings();
          onClose();
        }}
        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 text-sm text-left transition-colors"
      >
        <Settings className="w-4 h-4" />
        System Settings
      </button>
    </div>
  );
}
