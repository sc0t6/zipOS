import React, { useState, useEffect } from 'react';
import { User, Lock } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [savedUsername, setSavedUsername] = useState('');
  const [savedPassword, setSavedPassword] = useState('');
  const [savedAvatar, setSavedAvatar] = useState('👤');

  useEffect(() => {
    const storedUsername = localStorage.getItem('zipOS_username') || 'guest';
    const storedPassword = localStorage.getItem('zipOS_password') || 'guest';
    const storedAvatar = localStorage.getItem('zipOS_avatar') || '👤';
    setSavedUsername(storedUsername);
    setSavedPassword(storedPassword);
    setSavedAvatar(storedAvatar);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    // Check credentials
    if (username === savedUsername && password === savedPassword) {
      onLogin(username, password);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      {/* Wallpaper Z logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <span className="text-[40rem] select-none">Z</span>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-96 relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-4xl">{savedAvatar}</span>
          </div>
        </div>

        <h1 className="text-center mb-2 dark:text-white">zipOS</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-6">
          Sign in as {savedUsername}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                placeholder="Username"
                className="flex-1 bg-transparent outline-none dark:text-white"
                autoFocus
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Password"
                className="flex-1 bg-transparent outline-none dark:text-white"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2.5 rounded-lg hover:bg-blue-600 transition-all"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
          Hint: {savedUsername} / {savedPassword}
        </p>
      </div>
    </div>
  );
}
