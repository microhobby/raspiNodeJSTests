
const Gpio = require("onoff").Gpio;
const wifi = require("./wifi");

/* setup pins */
const yesLed = new Gpio(17, "out");
const noLed = new Gpio(27, "out");

wifi.startPolling();
