import React, { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

const fileSystem: Record<string, { type: 'file' | 'dir'; content?: string; children?: string[] }> = {
  '/': { type: 'dir', children: ['home', 'usr', 'etc', 'var'] },
  '/home': { type: 'dir', children: ['user'] },
  '/home/user': { type: 'dir', children: ['Documents', 'Downloads', 'Desktop', 'README.txt', 'startup.bat'] },
  '/home/user/Documents': { type: 'dir', children: ['notes.txt', 'project', 'test.bat'] },
  '/home/user/Documents/notes.txt': { type: 'file', content: 'This is a sample notes file.\nCreated in zipOS terminal.' },
  '/home/user/Documents/test.bat': { type: 'file', content: 'echo Hello from batch file!\necho This is a test batch script\ndir' },
  '/home/user/README.txt': { type: 'file', content: 'Welcome to zipOS!\n\nA modern web-based operating system.\n\nTry these commands:\n- ls\n- pwd\n- cd [directory]\n- cat [file]\n- help\n- nano [file.bat] to create batch files' },
  '/home/user/startup.bat': { type: 'file', content: 'echo Welcome to zipOS!\necho Current time: $(date)\npwd' },
  '/usr': { type: 'dir', children: ['bin', 'lib'] },
  '/etc': { type: 'dir', children: ['config'] },
  '/var': { type: 'dir', children: ['log'] },
};

export function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'zipOS Terminal v1.0.0' },
    { type: 'output', content: 'Type "help" for available commands.' },
    { type: 'output', content: '' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState('/home/user');
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [lines]);

  const resolvePath = (path: string): string => {
    if (path.startsWith('/')) {
      return path;
    }
    if (path === '..') {
      const parts = currentDir.split('/').filter(Boolean);
      parts.pop();
      return '/' + parts.join('/') || '/';
    }
    if (path === '.') {
      return currentDir;
    }
    return currentDir === '/' ? `/${path}` : `${currentDir}/${path}`;
  };

  const executeCommand = (cmd: string) => {
    const parts = cmd.trim().split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case 'help':
        return [
          'Available commands:',
          '  ls [path]          - List directory contents',
          '  cd [path]          - Change directory',
          '  pwd                - Print working directory',
          '  cat [file]         - Display file contents',
          '  echo [text]        - Display text',
          '  clear              - Clear terminal',
          '  date               - Show current date and time',
          '  whoami             - Show current user',
          '  uname              - Show system information',
          '  mkdir [name]       - Create directory (simulated)',
          '  touch [name]       - Create file (simulated)',
          '  nano [file.bat]    - Create/edit batch file',
          '  run [file.bat]     - Execute batch file',
          '  tree               - Display directory tree',
          '  help               - Show this help message',
        ];

      case 'ls':
        const lsPath = args[0] ? resolvePath(args[0]) : currentDir;
        const lsDir = fileSystem[lsPath];
        if (!lsDir) {
          return [`ls: cannot access '${args[0] || lsPath}': No such file or directory`];
        }
        if (lsDir.type !== 'dir') {
          return [args[0] || lsPath];
        }
        return lsDir.children || [];

      case 'cd':
        if (!args[0]) {
          setCurrentDir('/home/user');
          return [];
        }
        const newPath = resolvePath(args[0]);
        const targetDir = fileSystem[newPath];
        if (!targetDir) {
          return [`cd: ${args[0]}: No such file or directory`];
        }
        if (targetDir.type !== 'dir') {
          return [`cd: ${args[0]}: Not a directory`];
        }
        setCurrentDir(newPath);
        return [];

      case 'pwd':
        return [currentDir];

      case 'cat':
        if (!args[0]) {
          return ['cat: missing file operand'];
        }
        const filePath = resolvePath(args[0]);
        const file = fileSystem[filePath];
        if (!file) {
          return [`cat: ${args[0]}: No such file or directory`];
        }
        if (file.type !== 'file') {
          return [`cat: ${args[0]}: Is a directory`];
        }
        return (file.content || '').split('\n');

      case 'echo':
        return [args.join(' ')];

      case 'clear':
        setLines([]);
        return [];

      case 'date':
        return [new Date().toString()];

      case 'whoami':
        return ['user'];

      case 'uname':
        if (args[0] === '-a') {
          return ['zipOS 1.0.0 web x86_64 GNU/Linux'];
        }
        return ['zipOS'];

      case 'mkdir':
        if (!args[0]) {
          return ['mkdir: missing operand'];
        }
        return [`mkdir: created directory '${args[0]}' (simulated)`];

      case 'touch':
        if (!args[0]) {
          return ['touch: missing file operand'];
        }
        return [`touch: created file '${args[0]}' (simulated)`];

      case 'tree':
        return [
          currentDir,
          '├── Documents',
          '│   ├── notes.txt',
          '│   ├── test.bat',
          '│   └── project',
          '├── Downloads',
          '├── Desktop',
          '├── README.txt',
          '└── startup.bat',
        ];

      case 'nano':
        if (!args[0]) {
          return ['nano: missing file name'];
        }
        if (!args[0].endsWith('.bat')) {
          return ['nano: only .bat files are supported in this version'];
        }
        setEditingFile(args[0]);
        setFileContent('');
        return [`Opening ${args[0]} in editor... Type your commands (Ctrl+S to save, Ctrl+X to exit)`];

      case 'run':
      case 'exec':
        if (!args[0]) {
          return ['Usage: run [file.bat]'];
        }
        const batPath = resolvePath(args[0]);
        const batFile = fileSystem[batPath];
        if (!batFile || batFile.type !== 'file') {
          return [`Error: ${args[0]}: File not found`];
        }
        if (!args[0].endsWith('.bat')) {
          return [`Error: ${args[0]}: Not a batch file`];
        }
        
        // Execute bat file commands
        const commands = (batFile.content || '').split('\n').filter(cmd => cmd.trim());
        const results: string[] = [`Running ${args[0]}...`];
        commands.forEach(cmd => {
          const output = executeCommand(cmd.trim());
          results.push(`> ${cmd}`);
          results.push(...output);
        });
        return results;

      case '':
        return [];

      default:
        return [`${command}: command not found. Type 'help' for available commands.`];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add input to history
    setHistory([...history, input]);
    setHistoryIndex(-1);

    // Add command to lines
    setLines([...lines, { type: 'input', content: `user@zipos:${currentDir}$ ${input}` }]);

    // Execute command
    const output = executeCommand(input);
    const outputLines: TerminalLine[] = output.map((line) => ({
      type: 'output',
      content: line,
    }));

    if (input.trim().toLowerCase() !== 'clear') {
      setLines((prev) => [...prev, ...outputLines]);
    }

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  return (
    <div
      className="h-full bg-black text-green-400 font-mono text-sm p-4 overflow-auto"
      ref={terminalRef}
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line, index) => (
        <div key={index} className={line.type === 'error' ? 'text-red-400' : ''}>
          {line.content}
        </div>
      ))}
      <form onSubmit={handleSubmit} className="flex items-center gap-1">
        <span className="text-green-400">user@zipos:{currentDir}$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-green-400"
          autoFocus
        />
      </form>
    </div>
  );
}
