import React, { useState, useEffect } from 'react';
import { Monitor, Palette, Volume2, Wifi, User, Shield, Bell } from 'lucide-react';

interface SettingsProps {
  theme?: { mode: 'light' | 'dark'; accentColor: string; wallpaper: string };
  onThemeChange?: (theme: { mode: 'light' | 'dark'; accentColor: string; wallpaper: string }) => void;
}

const wallpapers = [
  { id: 'default', name: 'Default', preview: 'bg-gray-200 dark:bg-gray-800' },
  { id: 'dark', name: 'Dark', preview: 'bg-gray-900' },
  { id: 'blue', name: 'Blue', preview: 'bg-blue-500' },
  { id: 'purple', name: 'Purple', preview: 'bg-purple-500' },
  { id: 'gradient', name: 'Gradient', preview: 'bg-gradient-to-br from-blue-500 to-purple-600' },
];

export function Settings({ theme, onThemeChange }: SettingsProps) {
  const [selectedTab, setSelectedTab] = useState('appearance');
  const currentTheme = theme || { mode: 'light' as const, accentColor: 'red', wallpaper: 'default' };
  const [tempTheme, setTempTheme] = useState(currentTheme);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setTempTheme(currentTheme);
  }, [theme]);

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'display', label: 'Display', icon: Monitor },
    { id: 'sound', label: 'Sound', icon: Volume2 },
    { id: 'network', label: 'Network', icon: Wifi },
    { id: 'accounts', label: 'Accounts', icon: User },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const accentColors = [
    { name: 'red', class: 'bg-red-500', hex: '#ef4444' },
    { name: 'blue', class: 'bg-blue-500', hex: '#3b82f6' },
    { name: 'purple', class: 'bg-purple-500', hex: '#a855f7' },
    { name: 'green', class: 'bg-green-500', hex: '#22c55e' },
    { name: 'orange', class: 'bg-orange-500', hex: '#f97316' },
    { name: 'pink', class: 'bg-pink-500', hex: '#ec4899' },
  ];

  const handleThemeChange = (mode: 'light' | 'dark') => {
    setTempTheme({ ...tempTheme, mode });
    setHasChanges(true);
  };

  const handleAccentChange = (color: string) => {
    setTempTheme({ ...tempTheme, accentColor: color });
    setHasChanges(true);
  };

  const handleWallpaperChange = (wallpaper: string) => {
    setTempTheme({ ...tempTheme, wallpaper });
    setHasChanges(true);
  };

  const handleApply = () => {
    if (onThemeChange) {
      onThemeChange(tempTheme);
    }
    localStorage.setItem('zipOS_theme', JSON.stringify(tempTheme));
    document.documentElement.classList.toggle('dark', tempTheme.mode === 'dark');
    setHasChanges(false);
  };

  const handleCancel = () => {
    setTempTheme(currentTheme);
    setHasChanges(false);
  };

  return (
    <div className="flex h-full bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-48 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                selectedTab === tab.id
                  ? `bg-${tempTheme.accentColor}-500 text-white`
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              style={selectedTab === tab.id ? { backgroundColor: accentColors.find(c => c.name === tempTheme.accentColor)?.hex } : {}}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {selectedTab === 'appearance' && (
          <div>
            <h2 className="mb-6 dark:text-white">Appearance</h2>
            <div className="space-y-6">
              <div>
                <label className="block mb-3 dark:text-gray-300">Theme</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleThemeChange('light')}
                    className={`px-6 py-3 rounded-lg transition-all ${
                      tempTheme.mode === 'light'
                        ? 'text-white'
                        : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                    style={tempTheme.mode === 'light' ? { backgroundColor: accentColors.find(c => c.name === tempTheme.accentColor)?.hex } : {}}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className={`px-6 py-3 rounded-lg transition-all ${
                      tempTheme.mode === 'dark'
                        ? 'text-white'
                        : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                    style={tempTheme.mode === 'dark' ? { backgroundColor: accentColors.find(c => c.name === tempTheme.accentColor)?.hex } : {}}
                  >
                    Dark
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-3 dark:text-gray-300">Accent Color</label>
                <div className="flex gap-3 flex-wrap">
                  {accentColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleAccentChange(color.name)}
                      className={`w-12 h-12 rounded-full ${color.class} border-4 transition-all ${
                        tempTheme.accentColor === color.name
                          ? 'border-white dark:border-gray-900 ring-2 ring-gray-400 dark:ring-gray-600'
                          : 'border-transparent'
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-3 dark:text-gray-300">Wallpaper</label>
                <div className="grid grid-cols-3 gap-3">
                  {wallpapers.map((wallpaper) => (
                    <button
                      key={wallpaper.id}
                      onClick={() => handleWallpaperChange(wallpaper.id)}
                      className={`aspect-video rounded-lg overflow-hidden border-4 transition-all ${
                        tempTheme.wallpaper === wallpaper.id
                          ? 'border-white dark:border-gray-900 ring-2 ring-gray-400 dark:ring-gray-600'
                          : 'border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      <div className={`w-full h-full flex items-center justify-center ${wallpaper.preview}`}>
                        {wallpaper.id === 'default' && (
                          <span className="text-6xl opacity-20 dark:opacity-10 text-gray-600 dark:text-white">Z</span>
                        )}
                        <div className="absolute bottom-1 left-1 right-1 bg-black/50 text-white text-xs py-1 px-2 rounded">
                          {wallpaper.name}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Apply/Cancel Buttons */}
              {hasChanges && (
                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
                  <button
                    onClick={handleApply}
                    className="px-6 py-2 text-white rounded-lg transition-colors"
                    style={{ backgroundColor: accentColors.find(c => c.name === tempTheme.accentColor)?.hex }}
                  >
                    Apply
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedTab === 'display' && (
          <div>
            <h2 className="mb-4 dark:text-white">Display</h2>
            <p className="text-gray-600 dark:text-gray-400">Display settings coming soon...</p>
          </div>
        )}

        {selectedTab === 'sound' && (
          <div>
            <h2 className="mb-4 dark:text-white">Sound</h2>
            <p className="text-gray-600 dark:text-gray-400">Sound settings coming soon...</p>
          </div>
        )}

        {selectedTab === 'network' && (
          <div>
            <h2 className="mb-4 dark:text-white">Network</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="dark:text-white">Connected to local</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Network connection is stable</p>
              </div>
            </div>
          </div>
        )}

        {selectedTab !== 'appearance' && selectedTab !== 'network' && (
          <div>
            <h2 className="mb-4 dark:text-white capitalize">{selectedTab}</h2>
            <p className="text-gray-600 dark:text-gray-400">{selectedTab} settings coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
