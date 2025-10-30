import React, { useState } from 'react';
import { Plus, Search, Trash2, Pin } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  pinned: boolean;
}

const initialNotes: Note[] = [
  {
    id: '1',
    title: 'Welcome to Notes',
    content: 'This is your notes app. Create new notes by clicking the + button.',
    date: 'Oct 29, 2025',
    pinned: true,
  },
  {
    id: '2',
    title: 'Shopping List',
    content: '- Milk\n- Bread\n- Eggs\n- Coffee',
    date: 'Oct 28, 2025',
    pinned: false,
  },
  {
    id: '3',
    title: 'Ideas',
    content: 'Some random thoughts and ideas for future projects...',
    date: 'Oct 27, 2025',
    pinned: false,
  },
];

export function Notes() {
  const [notes, setNotes] = useState(initialNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      pinned: false,
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map(note => note.id === id ? { ...note, ...updates } : note));
    if (selectedNote?.id === id) {
      setSelectedNote({ ...selectedNote, ...updates });
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(notes[0] || null);
    }
  };

  const togglePin = (id: string) => {
    updateNote(id, { pinned: !notes.find(n => n.id === id)?.pinned });
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter(n => n.pinned);
  const unpinnedNotes = filteredNotes.filter(n => !n.pinned);

  return (
    <div className="h-full flex bg-white dark:bg-gray-900">
      {/* Notes List */}
      <div className="w-64 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={createNote}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition-colors mb-3"
          >
            <Plus className="w-4 h-4" />
            <span>New Note</span>
          </button>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className="flex-1 bg-transparent outline-none text-sm dark:text-gray-300"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {pinnedNotes.length > 0 && (
            <div className="p-2">
              <div className="text-xs text-gray-500 dark:text-gray-400 px-2 mb-2">PINNED</div>
              {pinnedNotes.map(note => (
                <button
                  key={note.id}
                  onClick={() => setSelectedNote(note)}
                  className={`w-full p-2 rounded-lg text-left mb-1 transition-colors ${
                    selectedNote?.id === note.id
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300'
                  }`}
                >
                  <div className="text-sm mb-1 truncate">{note.title}</div>
                  <div className={`text-xs truncate ${selectedNote?.id === note.id ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
                    {note.date} • {note.content.substring(0, 30)}...
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="p-2">
            {pinnedNotes.length > 0 && (
              <div className="text-xs text-gray-500 dark:text-gray-400 px-2 mb-2">NOTES</div>
            )}
            {unpinnedNotes.map(note => (
              <button
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`w-full p-2 rounded-lg text-left mb-1 transition-colors ${
                  selectedNote?.id === note.id
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300'
                }`}
              >
                <div className="text-sm mb-1 truncate">{note.title}</div>
                <div className={`text-xs truncate ${selectedNote?.id === note.id ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
                  {note.date} • {note.content.substring(0, 30)}...
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Note Editor */}
      {selectedNote ? (
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <input
              type="text"
              value={selectedNote.title}
              onChange={(e) => updateNote(selectedNote.id, { title: e.target.value })}
              className="flex-1 bg-transparent outline-none text-xl dark:text-white"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={() => togglePin(selectedNote.id)}
                className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  selectedNote.pinned ? 'text-blue-500' : 'dark:text-gray-400'
                }`}
              >
                <Pin className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteNote(selectedNote.id)}
                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors dark:text-gray-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 p-4">
            <textarea
              value={selectedNote.content}
              onChange={(e) => updateNote(selectedNote.id, { content: e.target.value })}
              className="w-full h-full bg-transparent outline-none resize-none dark:text-gray-300"
              placeholder="Start typing..."
            />
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
            Last edited: {selectedNote.date}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Select a note or create a new one
        </div>
      )}
    </div>
  );
}
