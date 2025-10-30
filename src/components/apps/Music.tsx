import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Heart, Music as MusicIcon } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  liked: boolean;
}

const playlist: Song[] = [
  { id: '1', title: 'Sunset Dreams', artist: 'The Relaxers', album: 'Chill Vibes', duration: '3:45', liked: true },
  { id: '2', title: 'Electric Nights', artist: 'Synth Wave', album: 'Neon City', duration: '4:12', liked: false },
  { id: '3', title: 'Morning Coffee', artist: 'Jazz Ensemble', album: 'Café Sessions', duration: '5:23', liked: true },
  { id: '4', title: 'Digital Rain', artist: 'Future Sounds', album: 'Cyber Dreams', duration: '3:58', liked: false },
];

export function Music() {
  const [currentSong, setCurrentSong] = useState(playlist[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState(playlist);

  const toggleLike = (id: string) => {
    setSongs(songs.map(song =>
      song.id === id ? { ...song, liked: !song.liked } : song
    ));
    if (currentSong.id === id) {
      setCurrentSong({ ...currentSong, liked: !currentSong.liked });
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 text-white">
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <h1 className="mb-8">Your Library</h1>
        
        {/* Now Playing Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 mb-8 border border-white/20">
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
              <MusicIcon className="w-16 h-16" />
            </div>
            <div className="flex-1">
              <h2 className="mb-2">{currentSong.title}</h2>
              <p className="text-white/70 mb-1">{currentSong.artist}</p>
              <p className="text-sm text-white/50">{currentSong.album}</p>
            </div>
            <button
              onClick={() => toggleLike(currentSong.id)}
              className="p-3 hover:bg-white/10 rounded-full transition-colors"
            >
              <Heart className={`w-6 h-6 ${currentSong.liked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Playlist */}
        <h3 className="mb-4">Up Next</h3>
        <div className="space-y-2">
          {songs.map(song => (
            <button
              key={song.id}
              onClick={() => setCurrentSong(song)}
              className={`w-full flex items-center gap-4 p-3 rounded-lg transition-colors ${
                currentSong.id === song.id
                  ? 'bg-white/20'
                  : 'hover:bg-white/10'
              }`}
            >
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                {currentSong.id === song.id && isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 text-left">
                <div>{song.title}</div>
                <div className="text-sm text-white/70">{song.artist}</div>
              </div>
              <div className="text-sm text-white/50">{song.duration}</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(song.id);
                }}
                className="p-2"
              >
                <Heart className={`w-4 h-4 ${song.liked ? 'fill-red-500 text-red-500' : 'text-white/50'}`} />
              </button>
            </button>
          ))}
        </div>
      </div>

      {/* Player Controls */}
      <div className="bg-black/40 backdrop-blur-xl border-t border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <div>{currentSong.title}</div>
            <div className="text-sm text-white/70">{currentSong.artist}</div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Shuffle className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-4 bg-white text-purple-900 rounded-full hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Repeat className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-end gap-2">
            <Volume2 className="w-5 h-5" />
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="70"
              className="w-24"
            />
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-2 text-sm">
          <span>0:00</span>
          <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-white rounded-full"></div>
          </div>
          <span>{currentSong.duration}</span>
        </div>
      </div>
    </div>
  );
}
