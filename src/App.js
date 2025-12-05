import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [display, setDisplay] = useState('0');
  const [operand, setOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(true);
  const [historyDisplay, setHistoryDisplay] = useState('');

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      const newDisplay = display === '0' ? String(digit) : display + digit;
      setDisplay(newDisplay);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      const newDisplay = display + '.';
      setDisplay(newDisplay);
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setOperand(null);
    setOperator(null);
    setWaitingForOperand(true);
    setHistoryDisplay('');
  };

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
    setHistoryDisplay(`${operand == null ? inputValue : String(operand)} ${nextOperator}`);
  };

  const calculate = (op1, op2, opr) => {
    switch (opr) {
      case '+': return op1 + op2;
      case '-': return op1 - op2;
      case '×': return op1 * op2;
      case '/': return op1 / op2;
      case 'xʸ': return Math.pow(op1, op2);
      default: return op2;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);
    if (operator && operand !== null) {
        const result = calculate(operand, inputValue, operator);
        setHistoryDisplay(`${operand} ${operator} ${inputValue} =`);
        setDisplay(String(result));
        setOperand(result); // Allow chaining operations from the result
        setOperator(null);
        setWaitingForOperand(true);
    }
  };

  const handleScientific = (func) => {
    const currentNum = parseFloat(display);
    let result;
    let funcDisplay = func;

    switch (func) {
      case 'sin': result = Math.sin(currentNum * Math.PI / 180); break; // Degrees
      case 'cos': result = Math.cos(currentNum * Math.PI / 180); break; // Degrees
      case 'tan': result = Math.tan(currentNum * Math.PI / 180); break; // Degrees
      case 'log': result = Math.log10(currentNum); break;
      case 'ln': result = Math.log(currentNum); break;
      case 'x²': result = Math.pow(currentNum, 2); funcDisplay = `sqr(${currentNum})`; break;
      case '√': result = Math.sqrt(currentNum); break;
      case '!': 
        result = (function factorial(n) {
          if (n < 0 || n % 1 !== 0) return NaN; // Factorial is for non-negative integers
          return n ? n * factorial(n - 1) : 1;
        })(currentNum);
        funcDisplay = `${currentNum}!`;
        break;
      case '±': result = currentNum * -1; break;
      case '%': result = currentNum / 100; break;
      default: return;
    }
    
    const finalResult = parseFloat(result.toPrecision(12));
    if (isNaN(finalResult)) {
      setDisplay('Error');
    } else {
      setDisplay(String(finalResult));
    }
    setHistoryDisplay(`${funcDisplay} = ${finalResult}`);
    setWaitingForOperand(true);
  }

  const handleConstant = (constName) => {
    let value;
    switch(constName) {
      case 'π': value = Math.PI; break;
      case 'e': value = Math.E; break;
      default: return;
    }
    setDisplay(String(value));
    setWaitingForOperand(false);
  }

  const buttonLayout = [
    // Row 1
    { label: 'sin', handler: () => handleScientific('sin'), className: 'btn-operator' },
    { label: 'cos', handler: () => handleScientific('cos'), className: 'btn-operator' },
    { label: 'tan', handler: () => handleScientific('tan'), className: 'btn-operator' },
    { label: 'log', handler: () => handleScientific('log'), className: 'btn-operator' },
    { label: 'ln', handler: () => handleScientific('ln'), className: 'btn-operator' },
    // Row 2
    { label: 'x²', handler: () => handleScientific('x²'), className: 'btn-operator' },
    { label: 'xʸ', handler: () => performOperation('xʸ'), className: 'btn-operator' },
    { label: '√', handler: () => handleScientific('√'), className: 'btn-operator' },
    { label: '!', handler: () => handleScientific('!'), className: 'btn-operator' },
    { label: '%', handler: () => handleScientific('%'), className: 'btn-operator' },
    // Row 3
    { label: 'π', handler: () => handleConstant('π'), className: 'btn-operator' },
    { label: 'e', handler: () => handleConstant('e'), className: 'btn-operator' },
    { label: 'AC', handler: clearAll, className: 'btn-special' },
    { label: '±', handler: () => handleScientific('±'), className: 'btn-operator' },
    { label: '/', handler: () => performOperation('/'), className: 'btn-operator' },
    // Row 4
    { label: '7', handler: () => inputDigit(7) },
    { label: '8', handler: () => inputDigit(8) },
    { label: '9', handler: () => inputDigit(9) },
    { label: '×', handler: () => performOperation('×'), className: 'btn-operator' },
    { label: '4', handler: () => inputDigit(4) },
    // Row 5
    { label: '5', handler: () => inputDigit(5) },
    { label: '6', handler: () => inputDigit(6) },
    { label: '-', handler: () => performOperation('-'), className: 'btn-operator' },
    { label: '1', handler: () => inputDigit(1) },
    { label: '2', handler: () => inputDigit(2) },
    // Row 6
    { label: '3', handler: () => inputDigit(3) },
    { label: '+', handler: () => performOperation('+'), className: 'btn-operator' },
    { label: '0', handler: () => inputDigit(0), className: 'btn-zero' },
    { label: '.', handler: inputDecimal },
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
