import React, { useState, useEffect } from 'react';
import { Window as WindowComponent } from './components/Window';
import { Dock } from './components/Dock';
import { MenuBar } from './components/MenuBar';
import { SpotlightSearch } from './components/SpotlightSearch';
import { ContextMenu } from './components/ContextMenu';
import { Login } from './components/Login';
import { Installation } from './components/Installation';
import { FileManager } from './components/apps/FileManager';
import { TextEditor } from './components/apps/TextEditor';
import { Calculator as CalculatorApp } from './components/apps/Calculator';
import { Browser } from './components/apps/Browser';
import { Terminal } from './components/apps/Terminal';
import { Settings } from './components/apps/Settings';
import { About } from './components/apps/About';
import { AppStore } from './components/apps/AppStore';
import { AppLibrary } from './components/apps/AppLibrary';
import { Mail } from './components/apps/Mail';
import { Photos } from './components/apps/Photos';
import { Music } from './components/apps/Music';
import { Notes } from './components/apps/Notes';
import { Calendar } from './components/apps/Calendar';
import { Maps } from './components/apps/Maps';
import { Window as WindowType, AppType, SystemTheme } from './types/os';

const appTitles: Record<AppType, string> = {
  'file-manager': 'File Manager',
  'text-editor': 'Text Editor',
  'calculator': 'Calculator',
  'browser': 'Browser',
  'terminal': 'Terminal',
  'settings': 'System Settings',
  'about': 'About This Mac',
  'app-store': 'App Store',
  'app-library': 'App Library',
  'mail': 'Mail',
  'photos': 'Photos',
  'music': 'Music',
  'notes': 'Notes',
  'calendar': 'Calendar',
  'maps': 'Maps',
};

type SystemState = 'login' | 'installation' | 'desktop';

interface DesktopFile {
  id: string;
  name: string;
  type: 'file' | 'folder' | 'shortcut';
  icon: string;
  x: number;
  y: number;
}

export default function App() {
  const [systemState, setSystemState] = useState<SystemState>('installation');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [userAvatar, setUserAvatar] = useState('👤');
  const [windows, setWindows] = useState<WindowType[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1);
  const [pinnedApps, setPinnedApps] = useState<AppType[]>(['browser', 'file-manager', 'mail', 'notes', 'app-store']);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [focusedApp, setFocusedApp] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [theme, setTheme] = useState<SystemTheme>({ mode: 'light', accentColor: 'red', wallpaper: 'default' });
  const [desktopFiles, setDesktopFiles] = useState<DesktopFile[]>([]);

  // Check if already logged in and installed on mount
  useEffect(() => {
    const installed = localStorage.getItem('zipOS_installed');
    const loggedIn = localStorage.getItem('zipOS_loggedIn');
    const user = localStorage.getItem('zipOS_username') || localStorage.getItem('zipOS_user');
    const avatar = localStorage.getItem('zipOS_avatar');
    const savedTheme = localStorage.getItem('zipOS_theme');

    // Load theme
    if (savedTheme) {
      const parsedTheme = JSON.parse(savedTheme);
      setTheme(parsedTheme);
      document.documentElement.classList.toggle('dark', parsedTheme.mode === 'dark');
    }

    if (installed === 'true') {
      if (user) setCurrentUser(user);
      if (avatar) setUserAvatar(avatar);
      
      if (loggedIn === 'true') {
        setIsLoggedIn(true);
        setSystemState('desktop');
      } else {
        setSystemState('login');
      }
    } else {
      setSystemState('installation');
    }
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + Space for Spotlight
      if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
        e.preventDefault();
        setShowSpotlight(prev => !prev);
      }
      // F4 or Fn+F4 for App Library (like macOS Launchpad)
      if (e.key === 'F4') {
        e.preventDefault();
        openApp('app-library');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogin = (username: string, password: string) => {
    // Simple authentication (in real app, this would be secure)
    setCurrentUser(username);
    setIsLoggedIn(true);
    localStorage.setItem('zipOS_loggedIn', 'true');
    localStorage.setItem('zipOS_user', username);
    setSystemState('desktop');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setWindows([]);
    setSystemState('login');
    localStorage.removeItem('zipOS_loggedIn');
  };

  const handleInstallationComplete = (username: string, password: string, avatar: string) => {
    setCurrentUser(username);
    setUserAvatar(avatar);
    setSystemState('login');
  };

  const createWindow = (app: AppType, data?: any): WindowType => {
    const windowCount = windows.filter((w) => w.app === app).length;
    const offset = windowCount * 30;
    
    return {
      id: `window-${Date.now()}-${Math.random()}`,
      title: appTitles[app],
      app,
      isMinimized: false,
      isMaximized: false,
      position: { x: 100 + offset, y: 60 + offset },
      size: { width: 900, height: 600 },
      zIndex: nextZIndex,
      data,
    };
  };

  const openApp = (app: AppType, data?: any) => {
    // App Library opens as full-screen overlay, not a window
    if (app === 'app-library') {
      const existingLibrary = windows.find(w => w.app === 'app-library');
      if (existingLibrary) {
        focusWindow(existingLibrary.id);
      } else {
        const libraryWindow = {
          ...createWindow(app, data),
          isMaximized: true,
          position: { x: 0, y: 0 },
        };
        setWindows([...windows, libraryWindow]);
        setNextZIndex(nextZIndex + 1);
        setFocusedApp(appTitles[app]);
      }
      setShowSpotlight(false);
      return;
    }

    // Check if app already has a window open
    const existingWindow = windows.find(w => w.app === app && !data);
    
    if (existingWindow) {
      // Focus existing window
      focusWindow(existingWindow.id);
    } else {
      const newWindow = createWindow(app, data);
      setWindows([...windows, newWindow]);
      setNextZIndex(nextZIndex + 1);
      setFocusedApp(appTitles[app]);
    }
    
    setShowSpotlight(false);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter((w) => w.id !== id));
    
    // Update focused app
    const remainingWindows = windows.filter((w) => w.id !== id);
    if (remainingWindows.length > 0) {
      const topWindow = remainingWindows.reduce((prev, current) => 
        current.zIndex > prev.zIndex ? current : prev
      );
      setFocusedApp(appTitles[topWindow.app]);
    } else {
      setFocusedApp(null);
    }
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)));
  };

  const maximizeWindow = (id: string) => {
    setWindows(windows.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)));
  };

  const focusWindow = (id: string) => {
    const window = windows.find((w) => w.id === id);
    if (window && window.isMinimized) {
      setWindows(
        windows.map((w) =>
          w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex } : w
        )
      );
      setNextZIndex(nextZIndex + 1);
      setFocusedApp(appTitles[window.app]);
    } else if (window) {
      setWindows(windows.map((w) => (w.id === id ? { ...w, zIndex: nextZIndex } : w)));
      setNextZIndex(nextZIndex + 1);
      setFocusedApp(appTitles[window.app]);
    }
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(windows.map((w) => (w.id === id ? { ...w, position } : w)));
  };

  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
    setWindows(windows.map((w) => (w.id === id ? { ...w, size } : w)));
  };

  const handleOpenFile = (content: string, fileName: string) => {
    openApp('text-editor', { content, fileName });
  };

  const handleThemeChange = (newTheme: SystemTheme) => {
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme.mode === 'dark');
  };

  const renderAppContent = (window: WindowType) => {
    switch (window.app) {
      case 'file-manager':
        return <FileManager onOpenFile={handleOpenFile} />;
      case 'text-editor':
        return (
          <TextEditor
            initialContent={window.data?.content}
            fileName={window.data?.fileName}
          />
        );
      case 'calculator':
        return <CalculatorApp />;
      case 'browser':
        return <Browser />;
      case 'terminal':
        return <Terminal />;
      case 'settings':
        return <Settings theme={theme} onThemeChange={handleThemeChange} />;
      case 'about':
        return <About />;
      case 'app-store':
        return <AppStore onInstallApp={openApp} />;
      case 'app-library':
        return <AppLibrary onAppLaunch={openApp} />;
      case 'mail':
        return <Mail />;
      case 'photos':
        return <Photos />;
      case 'music':
        return <Music />;
      case 'notes':
        return <Notes />;
      case 'calendar':
        return <Calendar />;
      case 'maps':
        return <Maps />;
      default:
        return <div className="p-4 dark:text-white">Unknown app</div>;
    }
  };

  // Render login screen
  if (systemState === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  // Render installation screen
  if (systemState === 'installation') {
    return <Installation onComplete={handleInstallationComplete} />;
  }

  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleDesktopClick = () => {
    setContextMenu(null);
  };

  const createDesktopFolder = () => {
    const newFolder: DesktopFile = {
      id: Date.now().toString(),
      name: 'New Folder',
      type: 'folder',
      icon: '📁',
      x: (contextMenu?.x || 100) - 40,
      y: (contextMenu?.y || 100) - 40,
    };
    setDesktopFiles([...desktopFiles, newFolder]);
  };

  const createDesktopFile = () => {
    const newFile: DesktopFile = {
      id: Date.now().toString(),
      name: 'New File.txt',
      type: 'file',
      icon: '📄',
      x: (contextMenu?.x || 100) - 40,
      y: (contextMenu?.y || 100) - 40,
    };
    setDesktopFiles([...desktopFiles, newFile]);
  };

  const getWallpaperClass = () => {
    switch (theme.wallpaper) {
      case 'dark':
        return 'bg-gray-900';
      case 'blue':
        return 'bg-blue-500';
      case 'purple':
        return 'bg-purple-500';
      case 'gradient':
        return 'bg-gradient-to-br from-blue-500 to-purple-600';
      default:
        return 'bg-gray-200 dark:bg-gray-800';
    }
  };

  // Render desktop
  return (
    <div
      className={`w-screen h-screen overflow-hidden relative ${getWallpaperClass()}`}
      onContextMenu={handleDesktopContextMenu}
      onClick={handleDesktopClick}
    >
      {/* Wallpaper with Z logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <span className="text-[30rem] font-bold text-white select-none">Z</span>
      </div>
      {/* Menu Bar */}
      <MenuBar
        currentApp={focusedApp}
        onSearch={() => setShowSpotlight(true)}
        onSettings={() => openApp('settings')}
        onLogout={handleLogout}
        username={currentUser}
        avatar={userAvatar}
      />

      {/* Windows */}
      {windows
        .filter((w) => !w.isMinimized)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((window) => (
          <WindowComponent
            key={window.id}
            id={window.id}
            title={window.title}
            isMaximized={window.isMaximized}
            position={window.position}
            size={window.size}
            zIndex={window.zIndex}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
            onPositionChange={(pos) => updateWindowPosition(window.id, pos)}
            onSizeChange={(size) => updateWindowSize(window.id, size)}
          >
            {renderAppContent(window)}
          </WindowComponent>
        ))}

      {/* Desktop Files */}
      {desktopFiles.map((file) => (
        <div
          key={file.id}
          className="absolute cursor-pointer select-none"
          style={{ left: file.x, top: file.y }}
          onDoubleClick={() => {
            if (file.type === 'folder') {
              openApp('file-manager');
            }
          }}
        >
          <div className="flex flex-col items-center p-2 rounded hover:bg-white/10 backdrop-blur-sm">
            <span className="text-4xl">{file.icon}</span>
            <span className="text-xs text-white mt-1 bg-black/30 px-2 py-0.5 rounded">{file.name}</span>
          </div>
        </div>
      ))}

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onRefresh={() => {}}
          onSettings={() => openApp('settings')}
          onCreateFolder={createDesktopFolder}
          onCreateFile={createDesktopFile}
        />
      )}

      {/* Spotlight Search */}
      {showSpotlight && (
        <SpotlightSearch
          onClose={() => setShowSpotlight(false)}
          onAppLaunch={openApp}
        />
      )}

      {/* Dock */}
      <Dock
        windows={windows}
        pinnedApps={pinnedApps}
        onAppLaunch={openApp}
        onWindowClick={focusWindow}
        onPinApp={(app) => setPinnedApps([...pinnedApps, app])}
        onUnpinApp={(app) => setPinnedApps(pinnedApps.filter(a => a !== app))}
        accentColor={theme.accentColor}
      />
    </div>
  );
}
