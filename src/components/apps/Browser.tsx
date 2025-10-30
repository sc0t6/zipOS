import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Search, Lock, AlertCircle } from 'lucide-react';

const mockPages: Record<string, { title: string; content: React.ReactNode }> = {
  'zipos.local': {
    title: 'zipOS - Home',
    content: (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          <h1 className="text-6xl mb-4">zipOS</h1>
          <p className="text-xl text-gray-600 mb-8">A Modern Web-Based Operating System</p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Get Started</button>
            <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Learn More</button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 py-8">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="mb-2">Fast & Responsive</h3>
            <p className="text-gray-600 text-sm">Built with modern web technologies for optimal performance.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="mb-2">User Friendly</h3>
            <p className="text-gray-600 text-sm">Intuitive interface that anyone can use.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="mb-2">Powerful Apps</h3>
            <p className="text-gray-600 text-sm">Includes file manager, text editor, calculator, and more.</p>
          </div>
        </div>
      </div>
    ),
  },
  'search.zipos': {
    title: 'zipOS Search',
    content: (
      <div className="max-w-2xl mx-auto py-32">
        <h1 className="text-5xl text-center mb-8">zipOS Search</h1>
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="Search the web..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-full outline-none focus:border-blue-500"
          />
          <button className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">Search</button>
        </div>
        <div className="text-center text-gray-600 text-sm">
          <p>Try searching for something!</p>
        </div>
      </div>
    ),
  },
};

const isExternalUrl = (url: string): boolean => {
  return url.includes('://') || url.startsWith('www.');
};

const formatUrl = (url: string): string => {
  if (url.startsWith('www.')) {
    return `https://${url}`;
  }
  if (!url.includes('://') && !url.endsWith('.local') && !url.includes('.zipos')) {
    // Check if it's a search query (contains spaces or no dots)
    if (url.includes(' ') || !url.includes('.')) {
      return `https://www.google.com/search?q=${encodeURIComponent(url)}&igu=1`;
    }
    return `https://${url}`;
  }
  return url;
};

export function Browser() {
  const [url, setUrl] = useState('zipos.local');
  const [inputUrl, setInputUrl] = useState('zipos.local');
  const [history, setHistory] = useState<string[]>(['zipos.local']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [iframeError, setIframeError] = useState(false);

  const navigateTo = (newUrl: string) => {
    const cleanUrl = newUrl.trim() || 'zipos.local';
    const formattedUrl = isExternalUrl(cleanUrl) ? formatUrl(cleanUrl) : cleanUrl;
    setUrl(formattedUrl);
    setInputUrl(cleanUrl);
    setIframeError(false);
    const newHistory = [...history.slice(0, historyIndex + 1), formattedUrl];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo(inputUrl);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setUrl(history[newIndex]);
      setInputUrl(history[newIndex]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setUrl(history[newIndex]);
      setInputUrl(history[newIndex]);
    }
  };

  const refresh = () => {
    setIframeError(false);
    setUrl(url + '?refresh=' + Date.now());
  };

  const goHome = () => {
    navigateTo('zipos.local');
  };

  const isExternal = isExternalUrl(url);
  const currentPage = mockPages[url];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Navigation Bar */}
      <div className="bg-gray-100 border-b border-gray-200 p-2 flex items-center gap-2">
        <button
          onClick={goBack}
          disabled={historyIndex === 0}
          className="p-2 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={goForward}
          disabled={historyIndex === history.length - 1}
          className="p-2 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
        <button onClick={refresh} className="p-2 hover:bg-gray-200 rounded">
          <RotateCw className="w-4 h-4" />
        </button>
        <button onClick={goHome} className="p-2 hover:bg-gray-200 rounded">
          <Home className="w-4 h-4" />
        </button>

        <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2">
          <div className="flex-1 flex items-center bg-white border border-gray-300 rounded-full px-3 py-1.5 focus-within:border-blue-500">
            <Lock className={`w-3 h-3 mr-2 ${isExternal ? 'text-green-600' : 'text-gray-400'}`} />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="flex-1 outline-none text-sm"
              placeholder="Enter URL or search..."
            />
            <Search className="w-4 h-4 text-gray-400" />
          </div>
        </form>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden bg-white relative">
        {isExternal ? (
          iframeError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="mb-2">Unable to load website</h2>
                <p className="text-gray-600 mb-4">
                  This website cannot be embedded. Some sites block being displayed in iframes.
                </p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => window.open(url, '_blank')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Open in New Tab
                  </button>
                  <button
                    onClick={goHome}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Go Home
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <iframe
              src={url}
              className="w-full h-full border-0"
              title="Browser content"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              onError={() => setIframeError(true)}
            />
          )
        ) : currentPage ? (
          <div className="h-full overflow-auto bg-gradient-to-b from-gray-50 to-white">
            <div className="p-8">{currentPage.content}</div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-6xl mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-4">Page not found</p>
              <p className="text-gray-500 mb-8">The page "{url}" could not be found.</p>
              <button
                onClick={goHome}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Go Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
