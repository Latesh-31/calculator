const display = document.getElementById('display');
const clearButton = document.getElementById('clear');
const backspaceButton = document.getElementById('backspace');
const equalsButton = document.getElementById('equals');
const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');
const multiplyButton = document.getElementById('multiply');
const divideButton = document.getElementById('divide');
const numberButtons = document.querySelectorAll('#zero, #one, #two, #three, #four, #five, #six, #seven, #eight, #nine');

let currentNumber = '';
let previousNumber = '';
let operation = '';

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentNumber += button.textContent;
        display.value = currentNumber;
    });
});

addButton.addEventListener('click', () => {
    previousNumber = currentNumber;
    operation = 'add';
    currentNumber = '';
});

subtractButton.addEventListener('click', () => {
    previousNumber = currentNumber;
    operation = 'subtract';
    currentNumber = '';
});

multiplyButton.addEventListener('click', () => {
    previousNumber = currentNumber;
    operation = 'multiply';
    currentNumber = '';
});

divideButton.addEventListener('click', () => {
    previousNumber = currentNumber;
    operation = 'divide';
    currentNumber = '';
});

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
        default:
            result = 0;
    }
    display.value = result.toString();
    currentNumber = result.toString();
    previousNumber = '';
    operation = '';
});

clearButton.addEventListener('click', () => {
    display.value = '';
    currentNumber = '';
    previousNumber = '';
    operation = '';
});

backspaceButton.addEventListener('click', () => {
    currentNumber = currentNumber.slice(0, -1);
    display.value = currentNumber;
});