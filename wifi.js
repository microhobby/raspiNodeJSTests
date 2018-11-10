
const http = require("http");
const oldVotes = {
	yes: 0,
	no: 0
};

module.exports= {
	startPolling: function(yesLed, noLed) {
		setInterval(function() {
		http.get("http://microhobby.com.br/safira2/vote.php", 
			function(res) {
		
				var data = "";
				res.setEncoding("utf8");

				res.on("data", function(chunk) {
					data += chunk;
				});

				res.on("end", function() {
					var decd = JSON.parse(data);
					decd.yes = parseInt(decd.yes);
					decd.no = parseInt(decd.no);

					console.log(decd);

					if (oldVotes.yes != decd.yes) {
						noLed.writeSync(0);
						yesLed.writeSync(0);
						
						oldVotes.yes = decd.yes;
						D23.blinkXTimes(3, function() {
							if (decd.yes > decd.no)
								yesLed.writeSync(1);
							else
								noLed.writeSync(1);
						});
					}

					if (oldVotes.no != decd.no) {
						noLed.writeSync(0);
						yesLed.writeSync(0);
						
						oldVotes.no = decd.no;
						D33.blinkXTimes(3,function() {
							if (decd.no > decd.yes)
								noLed.writeSync(1);
							else
								yesLed.writeSync(1);
						});
					}

					/* again */
					startPolling();
				});
			}
		);
		}, 1000);
	}
};
