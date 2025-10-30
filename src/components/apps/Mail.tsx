import React, { useState } from 'react';
import { Search, Star, Inbox, Send, Archive, Trash2, RefreshCw } from 'lucide-react';

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  time: string;
  read: boolean;
  starred: boolean;
}

const mockEmails: Email[] = [
  {
    id: '1',
    from: 'zipOS Team',
    subject: 'Welcome to zipOS!',
    preview: 'Thank you for trying zipOS. Here are some tips to get started...',
    time: '9:30 AM',
    read: false,
    starred: true,
  },
  {
    id: '2',
    from: 'Updates',
    subject: 'System Update Available',
    preview: 'A new version of zipOS is available for download...',
    time: 'Yesterday',
    read: true,
    starred: false,
  },
  {
    id: '3',
    from: 'Newsletter',
    subject: 'Weekly Tech Digest',
    preview: 'Top stories from the world of technology this week...',
    time: '2 days ago',
    read: true,
    starred: false,
  },
];

export function Mail() {
  const [emails, setEmails] = useState(mockEmails);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const toggleStar = (id: string) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, starred: !email.starred } : email
    ));
  };

  return (
    <div className="h-full flex bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-48 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-3">
        <button className="w-full bg-blue-500 text-white rounded-lg py-2 mb-4 hover:bg-blue-600 transition-colors">
          Compose
        </button>
        <div className="space-y-1">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
            <Inbox className="w-4 h-4" />
            <span>Inbox</span>
            <span className="ml-auto text-xs bg-blue-500 text-white px-1.5 rounded-full">3</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
            <Star className="w-4 h-4" />
            <span>Starred</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
            <Send className="w-4 h-4" />
            <span>Sent</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
            <Archive className="w-4 h-4" />
            <span>Archive</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
            <Trash2 className="w-4 h-4" />
            <span>Trash</span>
          </button>
        </div>
      </div>

      {/* Email List */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search mail..."
              className="flex-1 bg-transparent outline-none text-sm dark:text-gray-300"
            />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {emails.map(email => (
            <button
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              className={`w-full p-3 border-b border-gray-200 dark:border-gray-700 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                selectedEmail?.id === email.id ? 'bg-gray-100 dark:bg-gray-800' : ''
              }`}
            >
              <div className="flex items-start gap-2 mb-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStar(email.id);
                  }}
                  className="mt-1"
                >
                  <Star className={`w-4 h-4 ${email.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                </button>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm mb-1 ${!email.read ? 'font-semibold dark:text-white' : 'dark:text-gray-300'}`}>
                    {email.from}
                  </div>
                  <div className={`text-sm mb-1 ${!email.read ? 'font-semibold dark:text-white' : 'dark:text-gray-300'}`}>
                    {email.subject}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{email.preview}</div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{email.time}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 flex flex-col">
        {selectedEmail ? (
          <>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                  <Archive className="w-4 h-4 dark:text-gray-300" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                  <Trash2 className="w-4 h-4 dark:text-gray-300" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded ml-auto">
                  <RefreshCw className="w-4 h-4 dark:text-gray-300" />
                </button>
              </div>
              <h2 className="mb-2 dark:text-white">{selectedEmail.subject}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>{selectedEmail.from}</span>
                <span>•</span>
                <span>{selectedEmail.time}</span>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-auto dark:text-gray-300">
              <p>{selectedEmail.preview}</p>
              <p className="mt-4">
                This is a sample email in zipOS Mail. The full email content would appear here.
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select an email to read
          </div>
        )}
      </div>
    </div>
  );
}
