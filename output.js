
const Gpio = require("onoff").Gpio;

var pin = new Gpio(17, "out");

pin.writeSync(process.argv[1]);
