
const Gpio = require("onoff").Gpio;

var pin = new Gpio(17, "out");

setInterval(function() {
	pin.writeSync(!pin.readSync());
}, 200);
