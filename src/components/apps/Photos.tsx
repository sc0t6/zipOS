import React, { useState } from 'react';
import { Grid3x3, List, Heart, Share2, Trash2, Download } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Photo {
  id: string;
  url: string;
  title: string;
  date: string;
  liked: boolean;
}

const samplePhotos: Photo[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    title: 'Mountain Landscape',
    date: 'Oct 28, 2025',
    liked: false,
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
    title: 'Nature Path',
    date: 'Oct 27, 2025',
    liked: true,
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
    title: 'Sunset Valley',
    date: 'Oct 26, 2025',
    liked: false,
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
    title: 'Forest Trail',
    date: 'Oct 25, 2025',
    liked: true,
  },
];

export function Photos() {
  const [photos, setPhotos] = useState(samplePhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const toggleLike = (id: string) => {
    setPhotos(photos.map(photo =>
      photo.id === id ? { ...photo, liked: !photo.liked } : photo
    ));
    if (selectedPhoto?.id === id) {
      setSelectedPhoto({ ...selectedPhoto, liked: !selectedPhoto.liked });
    }
  };

  return (
    <div className="h-full flex bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-48 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-3">
        <div className="space-y-1">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded bg-blue-500 text-white text-sm">
            <Grid3x3 className="w-4 h-4" />
            <span>All Photos</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
            <Heart className="w-4 h-4" />
            <span>Favorites</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
            <Trash2 className="w-4 h-4" />
            <span>Recently Deleted</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="dark:text-white">All Photos</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              <Grid3x3 className="w-4 h-4 dark:text-gray-300" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              <List className="w-4 h-4 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Photos Grid/List */}
        <div className="flex-1 overflow-auto p-4">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-4 gap-4">
              {photos.map(photo => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="aspect-square rounded-lg overflow-hidden hover:opacity-80 transition-opacity relative group"
                >
                  <ImageWithFallback
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                  {photo.liked && (
                    <Heart className="absolute top-2 right-2 w-5 h-5 fill-red-500 text-red-500" />
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {photos.map(photo => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="w-full flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="dark:text-white">{photo.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{photo.date}</div>
                  </div>
                  {photo.liked && <Heart className="w-5 h-5 fill-red-500 text-red-500" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Photo Viewer */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <ImageWithFallback
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-4 flex items-center justify-between text-white">
              <div>
                <h3>{selectedPhoto.title}</h3>
                <p className="text-sm text-gray-400">{selectedPhoto.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleLike(selectedPhoto.id)}
                  className="p-2 hover:bg-white/10 rounded"
                >
                  <Heart className={`w-5 h-5 ${selectedPhoto.liked ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
                <button className="p-2 hover:bg-white/10 rounded">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
