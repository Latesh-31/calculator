import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [display, setDisplay] = useState('0');
  const [operand, setOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(true);
  const [memory, setMemory] = useState(0);
  const [historyDisplay, setHistoryDisplay] = useState(''); // New state for showing calculations

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
      // If an operator is pending, update history to show operand + operator + new digit
      setHistoryDisplay(operator ? `${operand} ${operator} ${digit}` : '');
    } else {
      const newDisplay = display === '0' ? String(digit) : display + digit;
      setDisplay(newDisplay);
      setHistoryDisplay(operator ? `${operand} ${operator} ${newDisplay}` : '');
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      setHistoryDisplay(operator ? `${operand} ${operator} 0.` : '');
    } else if (!display.includes('.')) {
      const newDisplay = display + '.';
      setDisplay(newDisplay);
      setHistoryDisplay(operator ? `${operand} ${operator} ${newDisplay}` : '');
    }
  };

  const toggleSign = () => {
    const newDisplay = String(parseFloat(display) * -1);
    setDisplay(newDisplay);
    // Update history only if an operator is pending
    if (operator && operand !== null) {
      setHistoryDisplay(`${operand} ${operator} (${newDisplay})`);
    }
  };

  const inputPercent = () => {
    const currentNum = parseFloat(display);
    const newDisplay = String(currentNum / 100);
    setDisplay(newDisplay);
    setWaitingForOperand(true);
    setHistoryDisplay(`${currentNum}% = ${newDisplay}`);
  };

  const clearAll = () => {
    setDisplay('0');
    setOperand(null);
    setOperator(null);
    setWaitingForOperand(true);
    setHistoryDisplay(''); // Clear history
  };
  
  const clearEntry = () => {
      setDisplay('0');
      setWaitingForOperand(true);
      // If an operator is pending, keep it in history, just clear the current input part
      setHistoryDisplay(operator && operand !== null ? `${operand} ${operator}` : '');
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (operand == null || waitingForOperand) {
      // If no operand or waiting for new input, current value becomes the first operand
      setOperand(inputValue);
    } else if (operator) {
      // If an operator is already set, perform the previous operation
      const result = calculate(operand, inputValue, operator);
      setOperand(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
    // Update history to show the current operand and the new pending operator
    setHistoryDisplay(`${operand == null ? inputValue : String(operand)} ${nextOperator}`);
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
        setHistoryDisplay(`${operand} ${operator} ${inputValue} =`); // Show full calculation
        setDisplay(String(result));
        setOperand(null); // Clear operand after equals for a fresh start
        setOperator(null); // Clear operator
        setWaitingForOperand(true); // Ready for a new number or operation
    } else if (operand !== null && !operator) {
        // If only an operand exists and no operator (e.g., '5 =' pressed)
        setHistoryDisplay(`${operand} =`);
        setDisplay(String(operand));
        setOperand(null);
        setWaitingForOperand(true);
    } else {
        // If only display value (e.g., '5 =' pressed without pending operand/operator)
        setHistoryDisplay(`${inputValue} =`);
        setDisplay(String(inputValue));
        setOperand(null);
        setWaitingForOperand(true);
    }
  };

  const handleMemory = (memOp) => {
    const currentValue = parseFloat(display);
    switch (memOp) {
        case 'M+': 
            setMemory(memory + currentValue);
            setWaitingForOperand(true);
            setHistoryDisplay(`M+ ${currentValue}`);
            break;
        case 'M-': 
            setMemory(memory - currentValue);
            setWaitingForOperand(true);
            setHistoryDisplay(`M- ${currentValue}`);
            break;
        case 'MRC': 
            setDisplay(String(memory));
            setWaitingForOperand(false); // Can continue typing after MRC
            setHistoryDisplay(`MRC = ${memory}`);
            break;
        default: break;
    }
  };

  const handleFunction = (func) => {
      if (func === '√') {
          const currentNum = parseFloat(display);
          const newDisplay = String(Math.sqrt(currentNum));
          setHistoryDisplay(`√${currentNum} = ${newDisplay}`);
          setDisplay(newDisplay);
          setWaitingForOperand(true);
      }
  }

  // Updated button layout with 'AC' button and rearranged for better flow
  const buttonLayout = [
    { label: 'AC', handler: clearAll, className: 'btn-special' },
    { label: 'CE', handler: clearEntry, className: 'btn-special' },
    { label: '%', handler: inputPercent, className: 'btn-operator' },
    { label: '√', handler: () => handleFunction('√'), className: 'btn-operator' },
    { label: 'M+', handler: () => handleMemory('M+'), className: 'btn-operator' },
    { label: '7', handler: () => inputDigit(7) },
    { label: '8', handler: () => inputDigit(8) },
    { label: '9', handler: () => inputDigit(9) },
    { label: '/', handler: () => performOperation('/'), className: 'btn-operator' },
    { label: 'M-', handler: () => handleMemory('M-'), className: 'btn-operator' },
    { label: '4', handler: () => inputDigit(4) },
    { label: '5', handler: () => inputDigit(5) },
    { label: '6', handler: () => inputDigit(6) },
    { label: '×', handler: () => performOperation('×'), className: 'btn-operator' },
    { label: 'MRC', handler: () => handleMemory('MRC'), className: 'btn-operator' },
    { label: '1', handler: () => inputDigit(1) },
    { label: '2', handler: () => inputDigit(2) },
    { label: '3', handler: () => inputDigit(3) },
    { label: '-', handler: () => performOperation('-'), className: 'btn-operator' },
    { label: '±', handler: toggleSign, className: 'btn-operator' },
    { label: '0', handler: () => inputDigit(0) },
    { label: '.', handler: inputDecimal },
    { label: '+', handler: () => performOperation('+'), className: 'btn-operator' },
    { label: '=', handler: handleEquals, className: 'btn-equals' },
  ];

  return (
    <div className="calculator">
      <div className="display">
        <div className="history-display">{historyDisplay}</div>
        <div className="current-display">{display}</div>
      </div>
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
