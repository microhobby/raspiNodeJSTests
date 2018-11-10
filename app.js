
const Pin = require("./pin").Pin;
//const wifi = require("./wifi");
const MqttConnection = require("./MqttConnection").MqttConnection;

const oldVotes = {
	yes: 0,
	no: 0
};

/* setup pins */
const D17 = new Pin(17);
const D27 = new Pin(27);

D27.mode("out");
D17.mode("out");

//wifi.startPolling(D17, D27);
polling = new MqttConnection("jssp/polling");
polling.connectMqtt();

polling.onMessageArrived = function(msg) {
	D27.reset();
	D17.reset();

	if (msg == "yes") {
		oldVotes.yes++;
		D17.blinkXTimes(3, function() {
			if (oldVotes.yes > oldVotes.no)
				D17.set();
			else
				D27.set();
		});
	}

	if (msg == "no") {
		oldVotes.no++;
		D27.blinkXTimes(3,function() {
			if (oldVotes.no > oldVotes.yes)
				D27.set();
			else
				D17.set();
		});
	}

	console.log(oldVotes);
};
