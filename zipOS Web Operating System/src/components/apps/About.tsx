import React from 'react';
import { Cpu, HardDrive, Monitor, Zap } from 'lucide-react';

export function About() {
  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
            <span className="text-4xl text-white">Z</span>
          </div>
          <h1 className="mb-2">zipOS</h1>
          <p className="text-gray-600">Version 1.0.0</p>
        </div>

        {/* Description */}
        <div className="mb-8 text-center">
          <p className="text-gray-700">
            A modern, web-based operating system built with React and TypeScript.
            Experience the power of a desktop OS right in your browser.
          </p>
        </div>

        {/* System Info */}
        <div className="space-y-4 mb-8">
          <h3 className="text-gray-800 mb-4">System Information</h3>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Cpu className="w-5 h-5 text-blue-500" />
            <div className="flex-1">
              <div className="text-sm text-gray-600">Processor</div>
              <div>WebKit Engine</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <HardDrive className="w-5 h-5 text-purple-500" />
            <div className="flex-1">
              <div className="text-sm text-gray-600">Storage</div>
              <div>Browser Local Storage</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Monitor className="w-5 h-5 text-green-500" />
            <div className="flex-1">
              <div className="text-sm text-gray-600">Display</div>
              <div>{window.screen.width} × {window.screen.height}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Zap className="w-5 h-5 text-orange-500" />
            <div className="flex-1">
              <div className="text-sm text-gray-600">Runtime</div>
              <div>React {React.version}</div>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="text-center text-sm text-gray-600 border-t pt-6">
          <p>Built with ❤️ using modern web technologies</p>
          <p className="mt-2">© 2025 zipOS. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
