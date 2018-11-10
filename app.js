
const Pin = require("./pin").Pin;
const wifi = require("./wifi");

/* setup pins */
const D17 = new Pin(17);
const D27 = new Pin(27);

D27.mode("out");
D17.mode("out");

wifi.startPolling(yesLed, noLed);
