import React, { useState, useEffect, useRef } from 'react';
import { Search, FolderOpen, FileText, Calculator, Globe, Terminal, Settings, Info, File, Folder, Mail, Image, Music, Calendar, MapPin, Grid3x3 } from 'lucide-react';
import { AppType } from '../types/os';

interface SpotlightSearchProps {
  onClose: () => void;
  onAppLaunch: (app: AppType) => void;
}

interface SearchResult {
  id: string;
  name: string;
  type: 'app' | 'file' | 'action';
  icon: React.ComponentType<{ className?: string }>;
  app?: AppType;
  action?: () => void;
}

const apps: SearchResult[] = [
  { id: 'file-manager', name: 'File Manager', type: 'app', icon: FolderOpen, app: 'file-manager' },
  { id: 'text-editor', name: 'Text Editor', type: 'app', icon: FileText, app: 'text-editor' },
  { id: 'calculator', name: 'Calculator', type: 'app', icon: Calculator, app: 'calculator' },
  { id: 'browser', name: 'Browser', type: 'app', icon: Globe, app: 'browser' },
  { id: 'terminal', name: 'Terminal', type: 'app', icon: Terminal, app: 'terminal' },
  { id: 'settings', name: 'System Settings', type: 'app', icon: Settings, app: 'settings' },
  { id: 'about', name: 'About This Mac', type: 'app', icon: Info, app: 'about' },
  { id: 'app-store', name: 'App Store', type: 'app', icon: Grid3x3, app: 'app-store' },
  { id: 'app-library', name: 'App Library', type: 'app', icon: Grid3x3, app: 'app-library' },
  { id: 'mail', name: 'Mail', type: 'app', icon: Mail, app: 'mail' },
  { id: 'photos', name: 'Photos', type: 'app', icon: Image, app: 'photos' },
  { id: 'music', name: 'Music', type: 'app', icon: Music, app: 'music' },
  { id: 'notes', name: 'Notes', type: 'app', icon: FileText, app: 'notes' },
  { id: 'calendar', name: 'Calendar', type: 'app', icon: Calendar, app: 'calendar' },
  { id: 'maps', name: 'Maps', type: 'app', icon: MapPin, app: 'maps' },
];

const files: SearchResult[] = [
  { id: 'file-1', name: 'README.txt', type: 'file', icon: File },
  { id: 'file-2', name: 'Documents', type: 'file', icon: Folder },
  { id: 'file-3', name: 'Pictures', type: 'file', icon: Folder },
  { id: 'file-4', name: 'Resume.txt', type: 'file', icon: File },
];

export function SpotlightSearch({ onClose, onAppLaunch }: SpotlightSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const allResults = [...apps, ...files];
  const filteredResults = query
    ? allResults.filter((result) =>
        result.name.toLowerCase().includes(query.toLowerCase())
      )
    : apps;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filteredResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(filteredResults[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSelect = (result: SearchResult) => {
    if (result.app) {
      onAppLaunch(result.app);
    } else if (result.action) {
      result.action();
    }
    onClose();
  };

  return (
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-32 z-50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <Search className="w-6 h-6 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search for apps, files, and more..."
            className="flex-1 bg-transparent outline-none text-xl"
          />
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-auto">
          {filteredResults.length > 0 ? (
            <div className="p-2">
              {filteredResults.map((result, index) => {
                const Icon = result.icon;
                return (
                  <button
                    key={result.id}
                    onClick={() => handleSelect(result)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      index === selectedIndex
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        index === selectedIndex
                          ? 'bg-white/20'
                          : result.type === 'app'
                          ? 'bg-red-500'
                          : 'bg-gray-200'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          index === selectedIndex
                            ? 'text-white'
                            : result.type === 'app'
                            ? 'text-white'
                            : 'text-gray-600'
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div>{result.name}</div>
                      <div
                        className={`text-xs ${
                          index === selectedIndex ? 'text-white/70' : 'text-gray-500'
                        }`}
                      >
                        {result.type === 'app' ? 'Application' : 'File'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No results found for "{query}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>↑↓ to navigate</span>
            <span>↵ to open</span>
            <span>esc to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
