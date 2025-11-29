const display = document.getElementById('display');
const keys = document.querySelectorAll('button');
let currentNumber = '';
let previousNumber = '';
let operator = null;

keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyValue = key.textContent;
        if (keyValue === 'C') {
            currentNumber = '';
            previousNumber = '';
            operator = null;
            display.value = '';
        } else if (keyValue === 'DEL') {
            currentNumber = currentNumber.slice(0, -1);
            display.value = currentNumber;
        } else if (keyValue === '=') {
            if (operator === '+') {
                display.value = parseFloat(previousNumber) + parseFloat(currentNumber);
            } else if (operator === '-') {
                display.value = parseFloat(previousNumber) - parseFloat(currentNumber);
            } else if (operator === '*') {
                display.value = parseFloat(previousNumber) * parseFloat(currentNumber);
            } else if (operator === '/') {
                display.value = parseFloat(previousNumber) / parseFloat(currentNumber);
            }
            currentNumber = display.value;
            previousNumber = '';
            operator = null;
        } else if (keyValue === '+' || keyValue === '-' || keyValue === '*' || keyValue === '/') {
            operator = keyValue;
            previousNumber = currentNumber;
            currentNumber = '';
        } else {
            currentNumber += keyValue;
            display.value = currentNumber;
        }
    });
});