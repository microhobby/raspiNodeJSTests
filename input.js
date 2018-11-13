
const Gpio = require("onoff").Gpio;

var pin = new Gpio(22, "in");

setInterval(function() 
{
	console.log(pin.readSync());
}, 200);
