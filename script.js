let display = document.getElementById('display');
let equals = document.getElementById('equals');
let clear = document.getElementById('clear');
let backspace = document.getElementById('backspace');
let numbers = document.querySelectorAll('.buttons button');
let currentNumber = '';
let previousNumber = '';
let operator = '';

numbers.forEach(button => {
    button.addEventListener('click', () => {
        currentNumber += button.textContent;
        display.value = currentNumber;
    });
});

equals.addEventListener('click', () => {
    calculate();
});

function calculate() {
    let result;
    switch (operator) {
        case '+':
            result = parseFloat(previousNumber) + parseFloat(currentNumber);
            break;
        case '-':
            result = parseFloat(previousNumber) - parseFloat(currentNumber);
            break;
        case '*':
            result = parseFloat(previousNumber) * parseFloat(currentNumber);
            break;
        case '/':
            result = parseFloat(previousNumber) / parseFloat(currentNumber);
            break;
        default:
            result = 0;
    }
    display.value = result;
    previousNumber = '';
    currentNumber = '';
}

clear.addEventListener('click', () => {
    display.value = '';
    currentNumber = '';
    previousNumber = '';
});

backspace.addEventListener('click', () => {
    currentNumber = currentNumber.slice(0, -1);
    display.value = currentNumber;
});

document.getElementById('add').addEventListener('click', () => {
    previousNumber = currentNumber;
    operator = '+';
    currentNumber = '';
});

document.getElementById('subtract').addEventListener('click', () => {
    previousNumber = currentNumber;
    operator = '-';
    currentNumber = '';
});

document.getElementById('multiply').addEventListener('click', () => {
    previousNumber = currentNumber;
    operator = '*';
    currentNumber = '';
});

document.getElementById('divide').addEventListener('click', () => {
    previousNumber = currentNumber;
    operator = '/';
    currentNumber = '';
});