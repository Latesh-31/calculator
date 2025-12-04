import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [display, setDisplay] = useState('0');
  const [operand, setOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(true);
  const [memory, setMemory] = useState(0);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setWaitingForOperand(false);
    }
  };

  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const inputPercent = () => {
    setDisplay(String(parseFloat(display) / 100));
    setWaitingForOperand(true);
  };

  const clearAll = () => {
    setDisplay('0');
    setOperand(null);
    setOperator(null);
    setWaitingForOperand(true);
  };
  
  const clearEntry = () => {
      setDisplay('0');
      setWaitingForOperand(true);
  }

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (operand == null) {
      setOperand(inputValue);
    } else if (operator) {
      const result = calculate(operand, inputValue, operator);
      setOperand(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (op1, op2, opr) => {
    switch (opr) {
      case '+': return op1 + op2;
      case '-': return op1 - op2;
      case '×': return op1 * op2;
      case '/': return op1 / op2;
      default: return op2;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);
    if (operator && operand !== null) {
        const result = calculate(operand, inputValue, operator);
        setDisplay(String(result));
        setOperand(result);
        setOperator(null);
        setWaitingForOperand(true);
    }
  };

  const handleMemory = (memOp) => {
    const currentValue = parseFloat(display);
    switch (memOp) {
        case 'M+': setMemory(memory + currentValue); setWaitingForOperand(true); break;
        case 'M-': setMemory(memory - currentValue); setWaitingForOperand(true); break;
        case 'MRC': setDisplay(String(memory)); break;
        default: break;
    }
  };

  const handleFunction = (func) => {
      if (func === '√') {
          setDisplay(String(Math.sqrt(parseFloat(display))));
          setWaitingForOperand(true);
      }
  }

  const buttonLayout = [
    { label: 'ON', handler: clearAll, className: 'btn-special' },
    { label: '√', handler: () => handleFunction('√'), className: 'btn-operator' },
    { label: '±', handler: toggleSign, className: 'btn-operator' },
    { label: '/', handler: () => performOperation('/'), className: 'btn-operator' },
    { label: '%', handler: inputPercent, className: 'btn-operator' },
    { label: '7', handler: () => inputDigit(7) },
    { label: '8', handler: () => inputDigit(8) },
    { label: '9', handler: () => inputDigit(9) },
    { label: '×', handler: () => performOperation('×'), className: 'btn-operator' },
    { label: 'MRC', handler: () => handleMemory('MRC'), className: 'btn-operator' },
    { label: '4', handler: () => inputDigit(4) },
    { label: '5', handler: () => inputDigit(5) },
    { label: '6', handler: () => inputDigit(6) },
    { label: '-', handler: () => performOperation('-'), className: 'btn-operator' },
    { label: 'M+', handler: () => handleMemory('M+'), className: 'btn-operator' },
    { label: '1', handler: () => inputDigit(1) },
    { label: '2', handler: () => inputDigit(2) },
    { label: '3', handler: () => inputDigit(3) },
    { label: '+', handler: () => performOperation('+'), className: 'btn-operator' },
    { label: 'M-', handler: () => handleMemory('M-'), className: 'btn-operator' },
    { label: '0', handler: () => inputDigit(0) },
    { label: '.', handler: inputDecimal },
    { label: 'CE', handler: clearEntry, className: 'btn-special' },
    { label: '=', handler: handleEquals, className: 'btn-equals' },
  ];

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        {buttonLayout.map(btn => (
            <button key={btn.label} onClick={btn.handler} className={btn.className || ''}>
                {btn.label}
            </button>
        ))}
      </div>
    </div>
  );
};

export default App;
