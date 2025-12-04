// script.js

const display = document.querySelector('.display');
const expressionDisplay = document.querySelector('.expression-display');
const buttons = document.querySelector('.buttons');

let currentExpression = '';
let lastResult = 0;

buttons.addEventListener('click', (e) => {
    if (!e.target.matches('button')) return;

    const button = e.target;
    const buttonText = button.textContent;

    if (button.id === 'clear') {
        currentExpression = '';
        display.textContent = '0';
        expressionDisplay.textContent = '';
    } else if (button.id === 'backspace') {
        currentExpression = currentExpression.slice(0, -1);
        display.textContent = currentExpression || '0';
    } else if (button.id === 'equals') {
        try {
            // Replace power operator for evaluation
            const expressionToEvaluate = currentExpression.replace('^', '**');
            lastResult = eval(expressionToEvaluate);
            display.textContent = lastResult;
            expressionDisplay.textContent = currentExpression + ' =';
            currentExpression = ''; // Clear for next calculation
        } catch (error) {
            display.textContent = 'Error';
            expressionDisplay.textContent = '';
        }
    } else if (button.id === 'ans') {
        currentExpression += lastResult;
        display.textContent = currentExpression;
    } else {
        // Handle numbers, operators, and other functions
        if (display.textContent === '0') {
            display.textContent = '';
        }
        currentExpression += buttonText;
        display.textContent = currentExpression;
    }
});