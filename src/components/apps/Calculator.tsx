import React, { useState } from 'react';
import { Delete } from 'lucide-react';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumberClick = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperationClick = (op: string) => {
    const currentValue = parseFloat(display);
    
    if (previousValue !== null && operation && !shouldResetDisplay) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    } else {
      setPreviousValue(currentValue);
    }
    
    setOperation(op);
    setShouldResetDisplay(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setShouldResetDisplay(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setShouldResetDisplay(false);
  };

  const handleDecimal = () => {
    if (shouldResetDisplay) {
      setDisplay('0.');
      setShouldResetDisplay(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const buttonClass = "h-14 rounded-lg transition-colors active:scale-95";

  return (
    <div className="flex flex-col h-full bg-gray-900 p-4">
      {/* Display */}
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="text-right text-3xl text-white font-mono break-all">
          {display}
        </div>
        {operation && (
          <div className="text-right text-sm text-gray-400 mt-1">
            {previousValue} {operation}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        <button
          onClick={handleClear}
          className={`${buttonClass} bg-red-500 hover:bg-red-600 text-white col-span-2`}
        >
          C
        </button>
        <button
          onClick={handleBackspace}
          className={`${buttonClass} bg-gray-600 hover:bg-gray-700 text-white`}
        >
          <Delete className="w-5 h-5 mx-auto" />
        </button>
        <button
          onClick={() => handleOperationClick('/')}
          className={`${buttonClass} bg-orange-500 hover:bg-orange-600 text-white`}
        >
          ÷
        </button>

        <button onClick={() => handleNumberClick('7')} className={`${buttonClass} bg-gray-700 hover:bg-gray-600 text-white`}>7</button>
        <button onClick={() => handleNumberClick('8')} className={`${buttonClass} bg-gray-700 hover:bg-gray-600 text-white`}>8</button>
        <button onClick={() => handleNumberClick('9')} className={`${buttonClass} bg-gray-700 hover:bg-gray-600 text-white`}>9</button>
        <button onClick={() => handleOperationClick('*')} className={`${buttonClass} bg-orange-500 hover:bg-orange-600 text-white`}>×</button>

        <button onClick={() => handleNumberClick('4')} className={`${buttonClass} bg-gray-700 hover:bg-gray-600 text-white`}>4</button>
        <button onClick={() => handleNumberClick('5')} className={`${buttonClass} bg-gray-700 hover:bg-gray-600 text-white`}>5</button>
        <button onClick={() => handleNumberClick('6')} className={`${buttonClass} bg-gray-700 hover:bg-gray-600 text-white`}>6</button>
        <button onClick={() => handleOperationClick('-')} className={`${buttonClass} bg-orange-500 hover:bg-orange-600 text-white`}>−</button>

        <button onClick={() => handleNumberClick('1')} className={`${buttonClass} bg-gray-700 hover:bg-gray-600 text-white`}>1</button>
        <button onClick={() => handleNumberClick('2')} className={`${buttonClass} bg-gray-700 hover:bg-gray-600 text-white`}>2</button>
        <button onClick={() => handleNumberClick('3')} className={`${buttonClass} bg-gray-700 hover:bg-gray-600 text-white`}>3</button>
        <button onClick={() => handleOperationClick('+')} className={`${buttonClass} bg-orange-500 hover:bg-orange-600 text-white`}>+</button>

        <button onClick={() => handleNumberClick('0')} className={`${buttonClass} bg-gray-700 hover:bg-gray-600 text-white col-span-2`}>0</button>
        <button onClick={handleDecimal} className={`${buttonClass} bg-gray-700 hover:bg-gray-600 text-white`}>.</button>
        <button onClick={handleEquals} className={`${buttonClass} bg-green-500 hover:bg-green-600 text-white`}>=</button>
      </div>
    </div>
  );
}
