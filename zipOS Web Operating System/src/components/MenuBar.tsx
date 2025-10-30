import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Volume2, Search, Settings, User, LogOut, Download, BatteryCharging } from 'lucide-react';

interface MenuBarProps {
  currentApp: string | null;
  onSearch: () => void;
  onSettings: () => void;
  onLogout: () => void;
  username?: string;
  avatar?: string;
}

export function MenuBar({ currentApp, onSearch, onSettings, onLogout, username = 'User', avatar = '👤' }: MenuBarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showDevMenu, setShowDevMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get battery status
  useEffect(() => {
    const getBatteryInfo = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery: any = await (navigator as any).getBattery();
          setBatteryLevel(Math.round(battery.level * 100));
          setIsCharging(battery.charging);

          battery.addEventListener('levelchange', () => {
            setBatteryLevel(Math.round(battery.level * 100));
          });

          battery.addEventListener('chargingchange', () => {
            setIsCharging(battery.charging);
          });
        } catch (error) {
          console.log('Battery API not supported');
        }
      }
    };

    getBatteryInfo();
  }, []);

  const timeString = currentTime.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  
  const dateString = currentTime.toLocaleDateString('en-US', { 
    weekday: 'short',
    month: 'short', 
    day: 'numeric' 
  });

  const handleDownload = (tool: string) => {
    alert(`Downloading ${tool}...\n\nIn a real system, this would download and install ${tool}.`);
    setShowDevMenu(false);
  };

  return (
    <div className="absolute top-0 left-0 right-0 h-8 bg-black/30 backdrop-blur-xl border-b border-white/10 flex items-center px-3 text-white text-sm z-50">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-xs">Z</span>
          </div>
          <span>zipOS</span>
        </div>
        
        {currentApp && (
          <>
            <span className="text-white/50">|</span>
            <span>{currentApp}</span>
          </>
        )}

        {/* Developer Tools Menu */}
        <div className="relative">
          <button
            onClick={() => setShowDevMenu(!showDevMenu)}
            className="flex items-center gap-1 px-2 py-1 hover:bg-white/10 rounded transition-colors"
          >
            <Download className="w-3 h-3" />
            <span className="text-xs">Dev Tools</span>
          </button>

          {showDevMenu && (
            <div className="absolute left-0 top-8 w-56 bg-gray-900/95 backdrop-blur-xl rounded-lg shadow-xl border border-white/10 py-1">
              <div className="px-3 py-2 text-xs text-white/50 border-b border-white/10">
                Programming Languages
              </div>
              <button
                onClick={() => handleDownload('Python 3.12')}
                className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/10 text-left transition-colors"
              >
                <span>Python 3.12</span>
                <Download className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleDownload('Java JDK 21')}
                className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/10 text-left transition-colors"
              >
                <span>Java JDK 21</span>
                <Download className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleDownload('Node.js 20')}
                className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/10 text-left transition-colors"
              >
                <span>Node.js 20</span>
                <Download className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleDownload('Go 1.21')}
                className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/10 text-left transition-colors"
              >
                <span>Go 1.21</span>
                <Download className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleDownload('Rust')}
                className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/10 text-left transition-colors"
              >
                <span>Rust</span>
                <Download className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleDownload('C++ Compiler')}
                className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/10 text-left transition-colors"
              >
                <span>C++ Compiler</span>
                <Download className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-3">
        <button
          onClick={onSearch}
          className="p-1 hover:bg-white/10 rounded transition-colors"
          title="Search (⌘+Space)"
        >
          <Search className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1" title="Network: local">
          <Wifi className="w-4 h-4" />
          <span className="text-xs">local</span>
        </div>

        <Volume2 className="w-4 h-4" />
        
        <div className="flex items-center gap-1" title={`Battery: ${batteryLevel}%${isCharging ? ' (Charging)' : ''}`}>
          {isCharging ? (
            <BatteryCharging className="w-4 h-4" />
          ) : (
            <Battery className="w-4 h-4" />
          )}
          <span className="text-xs">{batteryLevel}%</span>
        </div>

        <span className="text-xs">
          {dateString} {timeString}
        </span>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors text-base"
            title={username}
          >
            {avatar}
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-8 w-48 bg-gray-900/95 backdrop-blur-xl rounded-lg shadow-xl border border-white/10 py-1">
              <div className="px-3 py-2 border-b border-white/10">
                <div className="text-xs text-white/50">Signed in as</div>
                <div className="text-sm">{username}</div>
              </div>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onSettings();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/10 text-left transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>System Settings</span>
              </button>
              <div className="h-px bg-white/10 my-1"></div>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/10 text-left transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
