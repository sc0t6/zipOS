import React, { useRef, useState, useEffect } from 'react';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
  onSizeChange: (size: { width: number; height: number }) => void;
}

export function Window({
  id,
  title,
  children,
  isMaximized,
  position,
  size,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  onSizeChange,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const handleMouseDownDrag = (e: React.MouseEvent) => {
    if (isMaximized) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    onFocus();
  };

  const handleMouseDownResize = (e: React.MouseEvent) => {
    if (isMaximized) return;
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
    onFocus();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        
        // Window snapping
        const snapThreshold = 20;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        let snappedX = newX;
        let snappedY = newY;
        
        // Snap to left edge
        if (newX < snapThreshold) {
          snappedX = 0;
        }
        // Snap to right edge
        if (newX + size.width > screenWidth - snapThreshold) {
          snappedX = screenWidth - size.width;
        }
        // Snap to top edge
        if (newY < 32 + snapThreshold) {
          snappedY = 32;
        }
        
        onPositionChange({
          x: snappedX,
          y: snappedY,
        });
      }
      if (isResizing) {
        const newWidth = Math.max(300, resizeStart.width + (e.clientX - resizeStart.x));
        const newHeight = Math.max(200, resizeStart.height + (e.clientY - resizeStart.y));
        onSizeChange({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, resizeStart, onPositionChange, onSizeChange]);

  const windowStyle = isMaximized
    ? { top: 32, left: 0, width: '100%', height: 'calc(100% - 120px)' }
    : { top: position.y, left: position.x, width: size.width, height: size.height };

  return (
    <div
      ref={windowRef}
      className="absolute bg-white dark:bg-gray-900 rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-300 dark:border-gray-700"
      style={{
        ...windowStyle,
        zIndex,
      }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className="h-9 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-3 cursor-move select-none"
        onMouseDown={handleMouseDownDrag}
        onDoubleClick={onMaximize}
      >
        <span className="text-gray-900 dark:text-white text-sm truncate">{title}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={onMinimize}
            className="w-6 h-6 rounded hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
          >
            <Minus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={onMaximize}
            className="w-6 h-6 rounded hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
          >
            {isMaximized ? (
              <Minimize2 className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            ) : (
              <Maximize2 className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            )}
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-800">
        {children}
      </div>

      {/* Resize Handle */}
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
          onMouseDown={handleMouseDownResize}
        >
          <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-gray-400"></div>
        </div>
      )}
    </div>
  );
}
