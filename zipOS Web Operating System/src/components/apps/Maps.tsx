import React, { useState } from 'react';
import { Search, Navigation, Plus, Minus } from 'lucide-react';

export function Maps() {
  const [searchQuery, setSearchQuery] = useState('');
  const [zoom, setZoom] = useState(12);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a place..."
            className="flex-1 bg-transparent outline-none dark:text-gray-300"
          />
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-gray-100 dark:bg-gray-800">
        {/* Mock Map */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h3 className="mb-2 dark:text-white">Interactive Map</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Map functionality would be integrated here
            </p>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            onClick={() => setZoom(Math.min(20, zoom + 1))}
            className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Plus className="w-5 h-5 dark:text-gray-300" />
          </button>
          <button
            onClick={() => setZoom(Math.max(1, zoom - 1))}
            className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Minus className="w-5 h-5 dark:text-gray-300" />
          </button>
          <button className="w-10 h-10 bg-blue-500 text-white rounded-lg shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
            <Navigation className="w-5 h-5" />
          </button>
        </div>

        {/* Zoom Level Indicator */}
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg px-3 py-2 text-sm dark:text-gray-300">
          Zoom: {zoom}
        </div>
      </div>
    </div>
  );
}

function MapPin({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  );
}
