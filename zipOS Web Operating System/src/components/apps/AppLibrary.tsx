import React, { useState } from 'react';
import { FolderOpen, FileText, Calculator, Globe, Terminal, Settings, Info, Mail, Image, Music, Calendar, MapPin, Search, Grid3x3 } from 'lucide-react';
import { AppType } from '../../types/os';

interface AppLibraryProps {
  onAppLaunch: (app: AppType) => void;
  installedApps?: AppType[];
}

const allApps = [
  { id: 'file-manager' as AppType, name: 'File Manager', icon: FolderOpen, category: 'Utilities' },
  { id: 'text-editor' as AppType, name: 'Text Editor', icon: FileText, category: 'Productivity' },
  { id: 'calculator' as AppType, name: 'Calculator', icon: Calculator, category: 'Utilities' },
  { id: 'browser' as AppType, name: 'Browser', icon: Globe, category: 'Internet' },
  { id: 'terminal' as AppType, name: 'Terminal', icon: Terminal, category: 'Developer' },
  { id: 'settings' as AppType, name: 'Settings', icon: Settings, category: 'System' },
  { id: 'about' as AppType, name: 'About', icon: Info, category: 'System' },
  { id: 'mail' as AppType, name: 'Mail', icon: Mail, category: 'Productivity' },
  { id: 'photos' as AppType, name: 'Photos', icon: Image, category: 'Media' },
  { id: 'music' as AppType, name: 'Music', icon: Music, category: 'Media' },
  { id: 'calendar' as AppType, name: 'Calendar', icon: Calendar, category: 'Productivity' },
  { id: 'maps' as AppType, name: 'Maps', icon: MapPin, category: 'Navigation' },
  { id: 'notes' as AppType, name: 'Notes', icon: FileText, category: 'Productivity' },
  { id: 'app-store' as AppType, name: 'App Store', icon: Grid3x3, category: 'System' },
];

export function AppLibrary({ onAppLaunch, installedApps = [] }: AppLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(allApps.map(app => app.category)));

  const filteredApps = allApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const appsByCategory = categories.map(category => ({
    category,
    apps: filteredApps.filter(app => app.category === category),
  })).filter(group => group.apps.length > 0);

  return (
    <div className="h-full bg-black/60 backdrop-blur-xl text-white overflow-hidden">
      <div className="h-full flex flex-col p-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/20">
            <Search className="w-6 h-6 text-white/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search apps..."
              className="flex-1 bg-transparent outline-none text-xl placeholder-white/40"
              autoFocus
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              !selectedCategory
                ? 'bg-white text-purple-900'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            All Apps
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-purple-900'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Apps Grid by Category */}
        <div className="flex-1 overflow-auto">
          {appsByCategory.map(({ category, apps }) => (
            <div key={category} className="mb-8">
              <h2 className="mb-4 text-xl opacity-80">{category}</h2>
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
                {apps.map(app => {
                  const Icon = app.icon;
                  return (
                    <button
                      key={app.id}
                      onClick={() => onAppLaunch(app.id)}
                      className="flex flex-col items-center gap-3 group"
                    >
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-white/20 transition-all">
                        <Icon className="w-8 h-8" />
                      </div>
                      <span className="text-xs text-center">{app.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
