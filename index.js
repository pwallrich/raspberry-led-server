var Gpio = require('pigpio').Gpio;

console.log("Define each color from RGB Strip");
var ledRed = new Gpio(17, {mode: Gpio.output});
var ledGreen = new Gpio(22, {mode: Gpio.output});
var ledBlue = new Gpio(24, {mode: Gpio.output});

console.log("power up red");
ledRed.pwmWrite(255);

console.log("power up green");
ledGreen.pwmWrite(255);

console.log("power up blue");
ledBlue.pwmWrite(255);

setTimeout(function() {
  console.log("Stop all after 5 seconds");
  ledRed.pwmWrite(0);
  ledBlue.pwmWrite(0);
  ledGreen.pwmWrite(0);
}, 5000);