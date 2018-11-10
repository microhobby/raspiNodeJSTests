
const Gpio = require("onoff").Gpio;

exports.Pin = function(pin, edge, debounce) {
	const pinNumber = pin;
	var gpioObject = null;

	if (pinNumber == undefined)
		throw Error("Ta fazendo merda");

	this.blinkInterval = { id: 0 };

	this.mode = function(direction) {
		if (!edge && !debounce)
			gpioObject = new Gpio(pinNumber, direction);
		else if(!debounce)
			gpioObject = new Gpio(pinNumber, direction, edge);
		else
			gpioObject = new Gpio(pinNumber, direction, edge,
					{debounceTimeout: debounce});
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

	this.onClick = function(callBack) {
		var pin = this;
	
		gpioObject.watch(function(err, value) {
			if (callBack)
				callBack();
		});
	};

	this.onChange = function(callBack) {
		var pin = this;
	
		gpioObject.watch(function(err, value) {
			if (callBack)
				callBack();
		});
	};

	this.startBlink = function(time) {
		var pin = this;

		console.log("ID::" + pin.blinkInterval.id);

		/* clear previous */
		if (pin.blinkInterval.id != 0) {
			clearInterval(pin.blinkInterval.id);
			pin.blinkInterval.id = 0;
		}

		pin.blinkInterval.id = setInterval(function() {
			pin.toggle();
		}, time);
	};

	this.stopBlink = function() {
		if (this.blinkInterval.id != 0) {
			clearInterval(this.blinkInterval.id);
			this.blinkInterval.id = 0;
		}
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
