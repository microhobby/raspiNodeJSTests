
var gpio = require("rpi-gpio");

/* setup */
gpio.setup(17, gpio.DIR_OUT, write);
gpio.write(17, true);