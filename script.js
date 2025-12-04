// ... existing code ...

const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');
const clearButton = document.getElementById('clear');
const backspaceButton = document.getElementById('backspace');
const equalsButton = document.getElementById('equals');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');

let currentNumber = '';
let previousNumber = '';
let operation = '';
let history = [];

// Theme Toggle
const themeSwitcher = document.getElementById('theme-switcher');

themeSwitcher.addEventListener('change', () => {
    document.body.classList.toggle('dark-theme');
});


function updateDisplay() {
    display.value = currentNumber;
}

function updateHistory(calculation) {
    history.push(calculation);
    if (history.length > 5) {
        history.shift(); // Keep only the last 5 calculations
    }
    historyDisplay.innerHTML = history.map(item => `<div>${item}</div>`).join('');
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentNumber += button.textContent;
        updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentNumber === '') return;
        if (previousNumber !== '') {
            calculate();
        }
        operation = button.textContent;
        previousNumber = currentNumber;
        currentNumber = '';
    });
});

clearButton.addEventListener('click', () => {
    currentNumber = '';
    previousNumber = '';
    operation = '';
    updateDisplay();
});

backspaceButton.addEventListener('click', () => {
    currentNumber = currentNumber.slice(0, -1);
    updateDisplay();
});

function calculate() {
    let result;
    const previous = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    if (isNaN(previous) || isNaN(current)) return;

    switch (operation) {
        case '+':
            result = previous + current;
            break;
        case '-':
            result = previous - current;
            break;
        case '*':
            result = previous * current;
            break;
        case '/':
            if (current === 0) {
                result = 'Error';
                break;
            }
            result = previous / current;
            break;
        case 'power':
            result = Math.pow(previous, current);
            break;
        default:
            return;
    }

    currentNumber = result.toString();
    operation = '';
    previousNumber = '';

    updateDisplay();
    updateHistory(`${previous} ${operation} ${current} = ${result}`);
}

equalsButton.addEventListener('click', calculate);

// Trigonometric Functions
document.getElementById('sin').addEventListener('click', () => {
    currentNumber = Math.sin(parseFloat(currentNumber)).toString();
    updateDisplay();
    updateHistory(`sin(${parseFloat(currentNumber)}) = ${currentNumber}`);
});

document.getElementById('cos').addEventListener('click', () => {
    currentNumber = Math.cos(parseFloat(currentNumber)).toString();
    updateDisplay();
    updateHistory(`cos(${parseFloat(currentNumber)}) = ${currentNumber}`);
});

document.getElementById('tan').addEventListener('click', () => {
    currentNumber = Math.tan(parseFloat(currentNumber)).toString();
    updateDisplay();
    updateHistory(`tan(${parseFloat(currentNumber)}) = ${currentNumber}`);
});

// Logarithm Function
document.getElementById('log').addEventListener('click', () => {
    currentNumber = Math.log(parseFloat(currentNumber)).toString();
    updateDisplay();
    updateHistory(`log(${parseFloat(currentNumber)}) = ${currentNumber}`);
});

// Square Root Function
document.getElementById('sqrt').addEventListener('click', () => {
    currentNumber = Math.sqrt(parseFloat(currentNumber)).toString();
    updateDisplay();
    updateHistory(`√(${parseFloat(currentNumber)}) = ${currentNumber}`);
});

// Power Function
document.getElementById('power').addEventListener('click', () => {
    previousNumber = currentNumber;
    operation = 'power';
    currentNumber = '';
});

// Special Constants
document.getElementById('pi').addEventListener('click', () => {
    currentNumber += Math.PI.toString();
    updateDisplay();
});

document.getElementById('e').addEventListener('click', () => {
    currentNumber += Math.E.toString();
    updateDisplay();
});

// Update equalsButton event listener to handle power operation
equalsButton.addEventListener('click', () => {
    let result;
    switch (operation) {
        case 'add':
            result = parseFloat(previousNumber) + parseFloat(currentNumber);
            break;
        case 'subtract':
            result = parseFloat(previousNumber) - parseFloat(currentNumber);
            break;
        case 'multiply':
            result = parseFloat(previousNumber) * parseFloat(currentNumber);
            break;
        case 'divide':
            result = parseFloat(previousNumber) / parseFloat(currentNumber);
            break;
        case 'power':
            result = Math.pow(parseFloat(previousNumber), parseFloat(currentNumber));
            break;
        default:
            result = 0;
    }
    display.value = result.toString();
    currentNumber = result.toString();
    previousNumber = '';
    operation = '';
});
