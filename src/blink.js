// include onoff to interact with the raspi GPIO
var Gpio = require('onoff').Gpio

// setup GPIO Pins
var GREEN_LED = new Gpio(22, 'out');
var BLUE_LED = new Gpio(24, 'out');
var RED_LED = new Gpio(17, 'out');

var blinkInterval = setInterval(blinkLED, 250);

function blinkLED() {
  if (GREEN_LED.readSync() === 1) {
    GREEN_LED.writeSync(0);
    RED_LED.writeSync(1);
  } else if (RED_LED.readSync === 1) {
    RED_LED.writeSync(0);
    BLUE_LED.writeSync(1);
  } else {
    BLUE_LED.writeSync(0);
    GREEN_LED.writeSync(1);
  }
}