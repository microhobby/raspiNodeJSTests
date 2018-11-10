
const Gpio = require("onoff").Gpio;

/* setup */
const yesLed = new Gpio(17, "out");
const noLed = new Gpio(27, "out");

yesLed.writeSync(true);
