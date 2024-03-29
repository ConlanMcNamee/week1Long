var http = require("http");
var url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		//for the file section we removed the postData stuff
		//var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		route(handle, pathname, response, request);
		//request.setEncoding("utf8");

		/*request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chucnk '" + postDataChunk + "'.");
		});
		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});*/
	}

	http.createServer(onRequest).listen(8000);
	console.log("Server has started");
}

exports.start = start;