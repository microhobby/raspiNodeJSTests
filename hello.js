
const Pin = require("./pin").Pin;

/* setup pins */

/* yes led */
const D17 = new Pin(17);
/* no led */
const D27 = new Pin(27);
/* button */
const D23 = new Pin(23);
/* sensor */
const D22 = new Pin(22);

D27.mode("out");
D17.mode("out");
D23.mode("in", "falling");
D22.mode("in", "rising", 20);

D17.startBlink(200);

D23.onClick(function() {
	D17.stopBlink();
});

D22.onChange(function() {
	D17.startBlink(100);
	console.log("CHANGED");
});
