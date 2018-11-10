
const http = require("http");
const oldVotes = {
	yes: 0,
	no: 0
};

module.exports= {
	startPolling: function(D17, D27) {
		setTimeout(function() {
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
						D27.reset();
						D17.reset();
						
						oldVotes.yes = decd.yes;
						D17.blinkXTimes(3, function() {
							if (decd.yes > decd.no)
								D17.set();
							else
								D27.set();
						});
					}

					if (oldVotes.no != decd.no) {
						D27.reset();
						D17.reset();
						
						oldVotes.no = decd.no;
						D27.blinkXTimes(3, function() {
							if (decd.no > decd.yes)
								D27.set();
							else
								D17.set();
						});
					}

					/* again */
					module.exports.startPolling();
				});
			}
		);
		}, 1000);
	}
};
