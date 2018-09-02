var Gpio = require('pigpio').Gpio;
var express = require('express'),
  app = express();
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/rootRoute');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

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