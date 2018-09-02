var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http) //require socket.io module and pass the http object (server)
var Gpio = require('pigpio').Gpio; //include pigpio to interact with the GPIO
var ledRed = new Gpio(17, {mode: Gpio.output});
var ledGreen = new Gpio(22, {mode: Gpio.output});
var ledBlue = new Gpio(24, {mode: Gpio.output});
var redRGB = 0;
var greenRGB = 0;
var blueRGB = 0;

//RESET RGB LED
ledRed.digitalWrite(0); // Turn RED LED off
ledGreen.digitalWrite(0); // Turn GREEN LED off
ledBlue.digitalWrite(0); // Turn BLUE LED off

http.listen(3000); //listen to port 8080
console.log("listening on port 3000");

function handler(req, res) {
  fs.readFile(__dirname + '/public/rgb.html', function(err, data) {
    if(err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      console.log(err);
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  })
}


io.sockets.on('connection', function(socket){
  socket.on('rgbLed', function(data) {
    console.log(data);

    redRGB = parseInt(data.red);
    greenRGB = parseInt(data.green);
    blueRGB = parseInt(data.blue);

    ledRed.pwmWrite(redRGB);
    ledGreen.pwmWrite(greenRGB);
    ledBlue.pwmWrite(blueRGB);
  });
});

process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    ledRed.digitalWrite(0); // Turn RED LED off
    ledGreen.digitalWrite(0); // Turn GREEN LED off
    ledBlue.digitalWrite(0); // Turn BLUE LED off
    process.exit();
});