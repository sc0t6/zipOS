import React, { useState } from 'react';
import { Check, ChevronRight, User } from 'lucide-react';

interface InstallationProps {
  onComplete: (username: string, password: string, avatar: string) => void;
}

const avatarOptions = ['👤', '😀', '🎨', '🚀', '🌟', '💼', '🎮', '📚', '🎵', '⚡', '🔥', '💻'];

export function Installation({ onComplete }: InstallationProps) {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState({
    language: 'English',
    timezone: 'UTC',
    theme: 'light',
    username: '',
    password: '',
    confirmPassword: '',
    avatar: avatarOptions[0],
  });

  const steps = [
    {
      title: 'Welcome to zipOS',
      content: (
        <div className="text-center">
          <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl text-white">Z</span>
          </div>
          <h2 className="mb-4 dark:text-white">Welcome to zipOS</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            A modern web-based operating system with all the tools you need to be productive.
          </p>
          <ul className="text-left space-y-2 max-w-md mx-auto">
            <li className="flex items-center gap-2 dark:text-gray-300">
              <Check className="w-5 h-5 text-green-500" />
              <span>File management and organization</span>
            </li>
            <li className="flex items-center gap-2 dark:text-gray-300">
              <Check className="w-5 h-5 text-green-500" />
              <span>Text editing and document creation</span>
            </li>
            <li className="flex items-center gap-2 dark:text-gray-300">
              <Check className="w-5 h-5 text-green-500" />
              <span>Web browsing capabilities</span>
            </li>
            <li className="flex items-center gap-2 dark:text-gray-300">
              <Check className="w-5 h-5 text-green-500" />
              <span>Built-in terminal and development tools</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Select Language',
      content: (
        <div>
          <h2 className="mb-4 dark:text-white">Select Your Language</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Choose your preferred language for zipOS</p>
          <div className="space-y-2">
            {['English', 'Español', 'Français', 'Deutsch', '日本語'].map((lang) => (
              <button
                key={lang}
                onClick={() => setConfig({ ...config, language: lang })}
                className={`w-full p-3 rounded-lg border-2 text-left transition-all dark:text-white ${
                  config.language === lang
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'Create Account',
      content: (
        <div>
          <h2 className="mb-4 dark:text-white">Create Your Account</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Set up your username and password</p>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-2 dark:text-gray-300">Username</label>
              <input
                type="text"
                value={config.username}
                onChange={(e) => setConfig({ ...config, username: e.target.value })}
                placeholder="Enter your username"
                className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block mb-2 dark:text-gray-300">Password</label>
              <input
                type="password"
                value={config.password}
                onChange={(e) => setConfig({ ...config, password: e.target.value })}
                placeholder="Enter your password"
                className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block mb-2 dark:text-gray-300">Confirm Password</label>
              <input
                type="password"
                value={config.confirmPassword}
                onChange={(e) => setConfig({ ...config, confirmPassword: e.target.value })}
                placeholder="Confirm your password"
                className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Choose Avatar',
      content: (
        <div>
          <h2 className="mb-4 dark:text-white">Choose Your Avatar</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Select an avatar for your profile</p>
          
          <div className="grid grid-cols-6 gap-3">
            {avatarOptions.map((avatar) => (
              <button
                key={avatar}
                onClick={() => setConfig({ ...config, avatar })}
                className={`aspect-square rounded-lg border-2 text-4xl flex items-center justify-center transition-all ${
                  config.avatar === avatar
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'Customize',
      content: (
        <div>
          <h2 className="mb-4 dark:text-white">Customize Your Experience</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Set up your preferences</p>
          
          <div className="space-y-6">
            <div>
              <label className="block mb-2 dark:text-gray-300">Theme</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setConfig({ ...config, theme: 'light' })}
                  className={`p-4 rounded-lg border-2 ${
                    config.theme === 'light'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="w-full h-16 bg-white border border-gray-300 rounded mb-2"></div>
                  <span className="text-sm dark:text-white">Light</span>
                </button>
                <button
                  onClick={() => setConfig({ ...config, theme: 'dark' })}
                  className={`p-4 rounded-lg border-2 ${
                    config.theme === 'dark'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="w-full h-16 bg-gray-900 rounded mb-2"></div>
                  <span className="text-sm dark:text-white">Dark</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 dark:text-gray-300">Timezone</label>
              <select
                value={config.timezone}
                onChange={(e) => setConfig({ ...config, timezone: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              >
                <option>UTC</option>
                <option>America/New_York</option>
                <option>America/Los_Angeles</option>
                <option>Europe/London</option>
                <option>Europe/Paris</option>
                <option>Asia/Tokyo</option>
              </select>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Ready to Go',
      content: (
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h2 className="mb-4 dark:text-white">All Set!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            zipOS is ready to use. Click continue to start exploring.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm text-left">
            <p className="mb-2 dark:text-white">Your configuration:</p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Username: {config.username || 'Not set'}</li>
              <li>• Language: {config.language}</li>
              <li>• Theme: {config.theme}</li>
              <li>• Timezone: {config.timezone}</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (step === 2) {
      if (!config.username || !config.password) {
        alert('Please enter username and password');
        return;
      }
      if (config.password !== config.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
    }

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Save config to localStorage
      localStorage.setItem('zipOS_config', JSON.stringify(config));
      localStorage.setItem('zipOS_installed', 'true');
      localStorage.setItem('zipOS_username', config.username);
      localStorage.setItem('zipOS_password', config.password);
      localStorage.setItem('zipOS_avatar', config.avatar);
      
      if (config.theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
      
      onComplete(config.username, config.password, config.avatar);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-auto">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === step
                  ? 'w-8 bg-blue-500'
                  : index < step
                  ? 'w-2 bg-blue-500'
                  : 'w-2 bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="mb-8">{steps[step].content}</div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors dark:text-white"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all flex items-center gap-2"
          >
            {step === steps.length - 1 ? 'Get Started' : 'Continue'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
