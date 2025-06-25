
import React, { useState } from 'react';
import { Calculator as CalculatorIcon } from 'lucide-react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operator);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperator(nextOperator);
  };

  const calculate = (firstValue: number, secondValue: number, operator: string): number => {
    switch (operator) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operator) {
      const newValue = calculate(previousValue, inputValue, operator);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const Button = ({ 
    onClick, 
    className = '', 
    children 
  }: { 
    onClick: () => void; 
    className?: string; 
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className={`h-16 rounded-2xl font-semibold text-lg transition-all duration-200 active:scale-95 hover:shadow-lg ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/10">
        <div className="flex items-center justify-center mb-6">
          <CalculatorIcon className="text-purple-400 mr-3" size={32} />
          <h1 className="text-2xl font-bold text-white">Calculator</h1>
        </div>
        
        {/* Display */}
        <div className="bg-black/60 rounded-2xl p-6 mb-6 border border-white/10">
          <div className="text-right">
            <div className="text-white/60 text-sm mb-1">
              {previousValue !== null && operator ? `${previousValue} ${operator}` : ''}
            </div>
            <div className="text-white text-4xl font-light overflow-hidden">
              {display.length > 12 ? parseFloat(display).toExponential(6) : display}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {/* First Row */}
          <Button
            onClick={handleClear}
            className="col-span-2 bg-red-500/80 hover:bg-red-500 text-white"
          >
            Clear
          </Button>
          <Button
            onClick={() => {
              setDisplay(display.slice(0, -1) || '0');
            }}
            className="bg-orange-500/80 hover:bg-orange-500 text-white"
          >
            ⌫
          </Button>
          <Button
            onClick={() => handleOperator('÷')}
            className="bg-purple-500/80 hover:bg-purple-500 text-white"
          >
            ÷
          </Button>

          {/* Second Row */}
          <Button
            onClick={() => handleNumber('7')}
            className="bg-slate-700/80 hover:bg-slate-600 text-white"
          >
            7
          </Button>
          <Button
            onClick={() => handleNumber('8')}
            className="bg-slate-700/80 hover:bg-slate-600 text-white"
          >
            8
          </Button>
          <Button
            onClick={() => handleNumber('9')}
            className="bg-slate-700/80 hover:bg-slate-600 text-white"
          >
            9
          </Button>
          <Button
            onClick={() => handleOperator('×')}
            className="bg-purple-500/80 hover:bg-purple-500 text-white"
          >
            ×
          </Button>

          {/* Third Row */}
          <Button
            onClick={() => handleNumber('4')}
            className="bg-slate-700/80 hover:bg-slate-600 text-white"
          >
            4
          </Button>
          <Button
            onClick={() => handleNumber('5')}
            className="bg-slate-700/80 hover:bg-slate-600 text-white"
          >
            5
          </Button>
          <Button
            onClick={() => handleNumber('6')}
            className="bg-slate-700/80 hover:bg-slate-600 text-white"
          >
            6
          </Button>
          <Button
            onClick={() => handleOperator('-')}
            className="bg-purple-500/80 hover:bg-purple-500 text-white"
          >
            −
          </Button>

          {/* Fourth Row */}
          <Button
            onClick={() => handleNumber('1')}
            className="bg-slate-700/80 hover:bg-slate-600 text-white"
          >
            1
          </Button>
          <Button
            onClick={() => handleNumber('2')}
            className="bg-slate-700/80 hover:bg-slate-600 text-white"
          >
            2
          </Button>
          <Button
            onClick={() => handleNumber('3')}
            className="bg-slate-700/80 hover:bg-slate-600 text-white"
          >
            3
          </Button>
          <Button
            onClick={() => handleOperator('+')}
            className="bg-purple-500/80 hover:bg-purple-500 text-white"
          >
            +
          </Button>

          {/* Fifth Row */}
          <Button
            onClick={() => handleNumber('0')}
            className="col-span-2 bg-slate-700/80 hover:bg-slate-600 text-white"
          >
            0
          </Button>
          <Button
            onClick={handleDecimal}
            className="bg-slate-700/80 hover:bg-slate-600 text-white"
          >
            .
          </Button>
          <Button
            onClick={handleEquals}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            =
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
