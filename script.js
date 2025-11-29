const display = document.getElementById('display');
const sinButton = document.getElementById('sin');
const cosButton = document.getElementById('cos');
const tanButton = document.getElementById('tan');
const logButton = document.getElementById('log');
const sqrtButton = document.getElementById('sqrt');
const piButton = document.getElementById('pi');
const eButton = document.getElementById('e');

sinButton.addEventListener('click', () => {
  const value = Math.sin(parseFloat(display.value));
  display.value = value;
});

cosButton.addEventListener('click', () => {
  const value = Math.cos(parseFloat(display.value));
  display.value = value;
});

tanButton.addEventListener('click', () => {
  const value = Math.tan(parseFloat(display.value));
  display.value = value;
});

logButton.addEventListener('click', () => {
  const value = Math.log(parseFloat(display.value));
  display.value = value;
});

sqrtButton.addEventListener('click', () => {
  const value = Math.sqrt(parseFloat(display.value));
  display.value = value;
});

piButton.addEventListener('click', () => {
  display.value = Math.PI;
});

eButton.addEventListener('click', () => {
  display.value = Math.E;
});