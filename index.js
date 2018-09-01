var Gpio = require('pigpio').Gpio;
const express = require('express');
const app = express();
const port = 3000;

apt.get('/', (request, response) => {
  response.send('Hello from express');
})



app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`);
})

console.log("Define each color from RGB Strip");
var ledRed = new Gpio(17, {mode: Gpio.output});
var ledGreen = new Gpio(22, {mode: Gpio.output});
var ledBlue = new Gpio(24, {mode: Gpio.output});

var leds = [ledRed, ledGreen, ledBlue];
var i = 0;

var blinkInterval = setInterval(blinkLED, 500);

function blinkLED() {
  leds[i].pwmWrite(0)
  i = (i + 1) % leds.length;
  leds[i].pwmWrite(255);
}

process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    leds[i].pwmWrite(0);
    process.exit();
});