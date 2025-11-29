// ... existing code ...

// Trigonometric Functions
document.getElementById('sin').addEventListener('click', () => {
    currentNumber = Math.sin(parseFloat(currentNumber)).toString();
    display.value = currentNumber;
});

document.getElementById('cos').addEventListener('click', () => {
    currentNumber = Math.cos(parseFloat(currentNumber)).toString();
    display.value = currentNumber;
});

document.getElementById('tan').addEventListener('click', () => {
    currentNumber = Math.tan(parseFloat(currentNumber)).toString();
    display.value = currentNumber;
});

// Logarithm Function
document.getElementById('log').addEventListener('click', () => {
    currentNumber = Math.log(parseFloat(currentNumber)).toString();
    display.value = currentNumber;
});

// Square Root Function
document.getElementById('sqrt').addEventListener('click', () => {
    currentNumber = Math.sqrt(parseFloat(currentNumber)).toString();
    display.value = currentNumber;
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
    display.value = currentNumber;
});

document.getElementById('e').addEventListener('click', () => {
    currentNumber += Math.E.toString();
    display.value = currentNumber;
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