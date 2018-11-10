
const mqtt = require('mqtt');

exports.MqttConnection = function(topic) {
	var client = null;

	var me = this;
	this.connected = false;
	this.onDisconnect = null;
	this.onConnect = null;
	this.onConnectFail = null;
	/* use this to callback messages function(msg) */
	this.onMessageArrived = null;

	if (topic == undefined)
		throw Error("Use MqttConnection('your_topic') on constructor");

	this.connectMqtt = function () {
		client = mqtt.connect("mqtt://iot.eclipse.org");

		client.on("connect", function() {
			me.connected = true;
			console.log("broker connected");

			if (me.onConnect)
				me.onConnect();
			
			client.subscribe(topic);
		});

		client.on('message', function(msgTopic, message) {
			if(msgTopic == topic) {
				console.log("Message: " + message);
				if (me.onMessageArrived)
					me.onMessageArrived(msg);
			}
		});
	};

	this.sendMessage = function(message) {
		console.log("Sending " + message);
		client.publish(topic, message);
	};
};
