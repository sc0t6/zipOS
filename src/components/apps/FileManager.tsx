import React, { useState } from 'react';
import { Folder, File, FileText, Home, Trash2, Plus, Edit, MoreVertical, X, Check } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder' | 'bat' | 'txt' | 'shortcut';
  content?: string;
  target?: string;
  children?: FileItem[];
}

const initialFiles: FileItem[] = [
  {
    id: '1',
    name: 'Documents',
    type: 'folder',
    children: [
      { id: '2', name: 'notes.txt', type: 'txt', content: 'My notes...' },
      { id: '3', name: 'startup.bat', type: 'bat', content: 'echo Welcome to zipOS!' },
    ],
  },
  {
    id: '4',
    name: 'Downloads',
    type: 'folder',
    children: [],
  },
  {
    id: '5',
    name: 'Desktop',
    type: 'folder',
    children: [],
  },
  { id: '6', name: 'README.txt', type: 'txt', content: 'Welcome to zipOS File Manager!' },
];

export function FileManager() {
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; fileId: string } | null>(null);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState('');

  const getCurrentFiles = (): FileItem[] => {
    let current = files;
    for (const path of currentPath) {
      const folder = current.find(f => f.name === path);
      if (folder && folder.children) {
        current = folder.children;
      }
    }
    return current;
  };

  const navigateToFolder = (folderName: string) => {
    setCurrentPath([...currentPath, folderName]);
    setSelectedFile(null);
  };

  const navigateUp = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedFile(null);
    }
  };

  const navigateHome = () => {
    setCurrentPath([]);
    setSelectedFile(null);
  };

  const createFile = (type: 'file' | 'folder' | 'bat' | 'txt' | 'shortcut') => {
    const extension = type === 'bat' ? '.bat' : type === 'txt' ? '.txt' : type === 'shortcut' ? '.lnk' : '';
    const baseName = type === 'folder' ? 'New Folder' : `New File${extension}`;
    
    const newFile: FileItem = {
      id: Date.now().toString(),
      name: baseName,
      type: type === 'file' ? 'file' : type,
      content: type === 'bat' ? 'echo Hello World' : type === 'txt' ? '' : undefined,
      children: type === 'folder' ? [] : undefined,
    };

    const updateFiles = (items: FileItem[], path: string[]): FileItem[] => {
      if (path.length === 0) {
        return [...items, newFile];
      }
      return items.map(item => {
        if (item.name === path[0] && item.children) {
          return {
            ...item,
            children: updateFiles(item.children, path.slice(1)),
          };
        }
        return item;
      });
    };

    setFiles(updateFiles(files, currentPath));
    setShowCreateMenu(false);
    setEditingFile(newFile.id);
    setNewFileName(baseName);
  };

  const renameFile = (fileId: string, newName: string) => {
    const updateFiles = (items: FileItem[]): FileItem[] => {
      return items.map(item => {
        if (item.id === fileId) {
          return { ...item, name: newName };
        }
        if (item.children) {
          return { ...item, children: updateFiles(item.children) };
        }
        return item;
      });
    };

    setFiles(updateFiles(files));
    setEditingFile(null);
  };

  const deleteFile = (fileId: string) => {
    const updateFiles = (items: FileItem[]): FileItem[] => {
      return items.filter(item => {
        if (item.id === fileId) return false;
        if (item.children) {
          item.children = updateFiles(item.children);
        }
        return true;
      });
    };

    setFiles(updateFiles(files));
    setContextMenu(null);
  };

  const getFileIcon = (file: FileItem) => {
    if (file.type === 'folder') return <Folder className="w-6 h-6 text-blue-500" />;
    if (file.type === 'bat') return <FileText className="w-6 h-6 text-green-500" />;
    if (file.type === 'txt') return <FileText className="w-6 h-6 text-gray-500" />;
    return <File className="w-6 h-6 text-gray-400" />;
  };

  const handleFileClick = (file: FileItem) => {
    if (file.type === 'folder') {
      navigateToFolder(file.name);
    } else {
      setSelectedFile(file.id);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, fileId: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, fileId });
  };

  const currentFiles = getCurrentFiles();

  return (
    <div className="flex h-full bg-white dark:bg-gray-900" onClick={() => setContextMenu(null)}>
      {/* Sidebar */}
      <div className="w-48 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-2">
        <button
          onClick={navigateHome}
          className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm dark:text-white"
        >
          <Home className="w-4 h-4" />
          Home
        </button>
        <div className="mt-2 space-y-1">
          {files.filter(f => f.type === 'folder').map(folder => (
            <button
              key={folder.id}
              onClick={() => {
                setCurrentPath([folder.name]);
                setSelectedFile(null);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm dark:text-gray-300"
            >
              <Folder className="w-4 h-4 text-blue-500" />
              {folder.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2 flex items-center gap-2">
          <button
            onClick={navigateUp}
            disabled={currentPath.length === 0}
            className="px-3 py-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm dark:text-white"
          >
            ← Back
          </button>
          <div className="flex-1 bg-white dark:bg-gray-700 rounded px-3 py-1.5 text-sm dark:text-white">
            {currentPath.length === 0 ? 'Home' : currentPath.join(' / ')}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowCreateMenu(!showCreateMenu)}
              className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1 text-sm"
            >
              <Plus className="w-4 h-4" />
              New
            </button>
            {showCreateMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-10">
                <button
                  onClick={() => createFile('folder')}
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm dark:text-white"
                >
                  <Folder className="w-4 h-4 inline mr-2" />
                  Folder
                </button>
                <button
                  onClick={() => createFile('txt')}
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm dark:text-white"
                >
                  <FileText className="w-4 h-4 inline mr-2" />
                  Text File (.txt)
                </button>
                <button
                  onClick={() => createFile('bat')}
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm dark:text-white"
                >
                  <FileText className="w-4 h-4 inline mr-2" />
                  Batch File (.bat)
                </button>
                <button
                  onClick={() => createFile('shortcut')}
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm dark:text-white"
                >
                  <File className="w-4 h-4 inline mr-2" />
                  Shortcut
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Files Grid */}
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-4 gap-4">
            {currentFiles.map(file => (
              <div
                key={file.id}
                onClick={() => handleFileClick(file)}
                onContextMenu={(e) => handleContextMenu(e, file.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedFile === file.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  {getFileIcon(file)}
                  {editingFile === file.id ? (
                    <div className="flex items-center gap-1 w-full">
                      <input
                        type="text"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            renameFile(file.id, newFileName);
                          } else if (e.key === 'Escape') {
                            setEditingFile(null);
                          }
                        }}
                        className="flex-1 px-1 py-0.5 text-xs border rounded dark:bg-gray-700 dark:text-white"
                        autoFocus
                      />
                      <button
                        onClick={() => renameFile(file.id, newFileName)}
                        className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                      >
                        <Check className="w-3 h-3 text-green-500" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-center break-all dark:text-white">{file.name}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-50"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              const file = currentFiles.find(f => f.id === contextMenu.fileId);
              if (file) {
                setEditingFile(file.id);
                setNewFileName(file.name);
              }
              setContextMenu(null);
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm dark:text-white"
          >
            <Edit className="w-4 h-4" />
            Rename
          </button>
          <button
            onClick={() => deleteFile(contextMenu.fileId)}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-sm text-red-500"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
