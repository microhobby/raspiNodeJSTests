
const Gpio = require("onoff").Gpio;

exports.Pin = function(pin) {
	const pinNumber = pin;
	var gpioObject = null;

	if (pinNumber == undefined)
		throw Error("Ta fazendo merda");

	this.blinkInterval = { id: 0 };

	this.mode = function(direction) {
		gpioObject = new Gpio(pinNumber, direction);
	};

	this.set = function() {
		gpioObject.writeSync(1);
	};

	this.reset = function() {
		gpioObject.writeSync(0);
	};

	this.toggle = function() {
		var pinVal = gpioObject.readSync();
		gpioObject.writeSync(!pinVal ? 1 : 0);
	};

	this.blinkXTimes = function(times, onEnd) {
		var pin = this;
		var timesCounted = 0;

		console.log("ID::" + pin.blinkInterval.id);

		/* clear previous */
		if (pin.blinkInterval.id != 0) {
			clearInterval(pin.blinkInterval.id);
			pin.blinkInterval.id = 0;
		}

		pin.blinkInterval.id = setInterval(function() {
			pin.toggle();
			timesCounted++;

			if (timesCounted == (2*times)) {
				clearInterval(pin.blinkInterval.id);
				pin.blinkInterval.id = 0;
				if (onEnd)
					onEnd();
			}
		}, 100);
	};
}
