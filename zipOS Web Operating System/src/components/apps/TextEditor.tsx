import React, { useState } from 'react';
import { Save, FileText, Bold, Italic, Underline } from 'lucide-react';

interface TextEditorProps {
  initialContent?: string;
  fileName?: string;
}

export function TextEditor({ initialContent = '', fileName = 'Untitled.txt' }: TextEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [currentFileName, setCurrentFileName] = useState(fileName);
  const [isSaved, setIsSaved] = useState(true);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    // In a real app, this would save to the file system
    console.log('Saved:', currentFileName, content);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Toolbar */}
      <div className="bg-gray-100 border-b border-gray-200 p-2 flex items-center gap-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span className="text-sm">Save</span>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button className="p-1 hover:bg-gray-200 rounded">
          <Bold className="w-4 h-4" />
        </button>
        <button className="p-1 hover:bg-gray-200 rounded">
          <Italic className="w-4 h-4" />
        </button>
        <button className="p-1 hover:bg-gray-200 rounded">
          <Underline className="w-4 h-4" />
        </button>
        <div className="flex-1"></div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FileText className="w-4 h-4" />
          <span>{currentFileName}</span>
          {!isSaved && <span className="text-red-500">*</span>}
        </div>
      </div>

      {/* Editor */}
      <textarea
        value={content}
        onChange={handleContentChange}
        className="flex-1 p-4 resize-none outline-none font-mono text-sm"
        placeholder="Start typing..."
        spellCheck={false}
      />

      {/* Status Bar */}
      <div className="bg-gray-100 border-t border-gray-200 px-3 py-1 text-xs text-gray-600 flex items-center justify-between">
        <span>Lines: {content.split('\n').length}</span>
        <span>Characters: {content.length}</span>
      </div>
    </div>
  );
}
