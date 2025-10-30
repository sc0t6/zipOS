import React, { useState } from 'react';
import { Search, Star, Download, Check } from 'lucide-react';
import { AppType } from '../../types/os';

interface App {
  id: string;
  name: string;
  app: AppType | null;
  category: string;
  rating: number;
  downloads: string;
  size: string;
  description: string;
  installed: boolean;
  icon: string;
}

const availableApps: App[] = [
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    app: null,
    category: 'Development',
    rating: 4.9,
    downloads: '50M+',
    size: '95 MB',
    description: 'Code editing redefined. Free. Built on open source.',
    installed: false,
    icon: '💻',
  },
  {
    id: 'discord',
    name: 'Discord',
    app: null,
    category: 'Social',
    rating: 4.7,
    downloads: '150M+',
    size: '85 MB',
    description: 'Your place to talk. Create a home for your communities and friends.',
    installed: false,
    icon: '💬',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    app: 'music',
    category: 'Entertainment',
    rating: 4.8,
    downloads: '500M+',
    size: '120 MB',
    description: 'Listen to millions of songs and podcasts on Spotify.',
    installed: false,
    icon: '🎵',
  },
  {
    id: 'roblox',
    name: 'Roblox',
    app: null,
    category: 'Games',
    rating: 4.5,
    downloads: '100M+',
    size: '250 MB',
    description: 'Roblox is the ultimate virtual universe where you can create and share experiences.',
    installed: false,
    icon: '🎮',
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    app: null,
    category: 'Games',
    rating: 4.6,
    downloads: '200M+',
    size: '500 MB',
    description: 'Explore infinite worlds and build everything from simple homes to grand castles.',
    installed: false,
    icon: '⛏️',
  },
  {
    id: 'zoom',
    name: 'Zoom',
    app: null,
    category: 'Productivity',
    rating: 4.4,
    downloads: '300M+',
    size: '45 MB',
    description: 'Video conferencing, cloud phone, webinars, and more.',
    installed: false,
    icon: '📹',
  },
  {
    id: 'slack',
    name: 'Slack',
    app: null,
    category: 'Productivity',
    rating: 4.6,
    downloads: '50M+',
    size: '75 MB',
    description: 'Slack brings all your communication together in one place.',
    installed: false,
    icon: '💼',
  },
  {
    id: 'notion',
    name: 'Notion',
    app: 'notes',
    category: 'Productivity',
    rating: 4.8,
    downloads: '20M+',
    size: '65 MB',
    description: 'One workspace. Every team. Write, plan, collaborate, and get organized.',
    installed: false,
    icon: '📝',
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    app: 'photos',
    category: 'Creative',
    rating: 4.7,
    downloads: '10M+',
    size: '2.1 GB',
    description: 'Create beautiful images, graphics, paintings, and 3D artwork.',
    installed: false,
    icon: '🎨',
  },
  {
    id: 'obs',
    name: 'OBS Studio',
    app: null,
    category: 'Creative',
    rating: 4.8,
    downloads: '15M+',
    size: '110 MB',
    description: 'Free and open source software for video recording and live streaming.',
    installed: false,
    icon: '🎥',
  },
  {
    id: 'gimp',
    name: 'GIMP',
    app: null,
    category: 'Creative',
    rating: 4.5,
    downloads: '30M+',
    size: '210 MB',
    description: 'GNU Image Manipulation Program - Free & Open Source Image Editor.',
    installed: false,
    icon: '🖌️',
  },
  {
    id: 'steam',
    name: 'Steam',
    app: null,
    category: 'Games',
    rating: 4.6,
    downloads: '120M+',
    size: '1.5 MB',
    description: 'The ultimate entertainment platform for PC gaming.',
    installed: false,
    icon: '🎮',
  },
];

interface AppStoreProps {
  onInstallApp?: (app: AppType) => void;
}

export function AppStore({ onInstallApp }: AppStoreProps) {
  const [apps, setApps] = useState(availableApps);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Development', 'Productivity', 'Games', 'Creative', 'Social', 'Entertainment'];

  const handleInstall = (appId: string) => {
    setApps(apps.map(app => 
      app.id === appId ? { ...app, installed: true } : app
    ));
    
    const app = apps.find(a => a.id === appId);
    if (app?.app && onInstallApp) {
      onInstallApp(app.app);
    }
  };

  const filteredApps = apps.filter(app => {
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-blue-500 text-white p-6">
        <h1 className="mb-4">App Store</h1>
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
          <Search className="w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search apps..."
            className="flex-1 bg-transparent outline-none placeholder-white/70"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 p-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Apps Grid */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredApps.map(app => (
            <div
              key={app.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0 text-3xl border border-gray-200 dark:border-gray-600">
                  {app.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1 dark:text-white">{app.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{app.category}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{app.rating}</span>
                    </div>
                    <span>{app.downloads}</span>
                    <span>{app.size}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleInstall(app.id)}
                  disabled={app.installed}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    app.installed
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {app.installed ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Installed</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Get</span>
                    </>
                  )}
                </button>
              </div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{app.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
