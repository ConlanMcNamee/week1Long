var querystring = require("querystring");
var http = require("http");
var fs = require('fs'),
		formidable = require("formidable");

//post data can go into start as a pararemter
function start(response) {
	console.log("Request handler start was called");

	var body = 
		'<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; '+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" enctype="multipart/form-data" '+
		'method="post">'+
		'<input type="file" name="upload" multiple="multiple">'+
		//previous form for entering text and having it appear on our upload
		//'<textarea name="text" rows="20" cols="60"></textarea>'+
		//value is what our button will read
		'<input type="submit" value="Upload file" />'+
		'</form>'+
		'</body>'+
		'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();

}

//can put postData instead of request
function upload(response, request) {
	console.log("Request handler 'upload' was called");

	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields, files) {
		console.log("parsing done");
																//renaming our tmp test.png. also passgin error along through functions
		fs.rename(files.upload.path, "/tmp/test.png", function(error) {
			if(error) {
				//if error unlink this location and give name it /tmp/test.png
				fs.unlink("/tmp/test.png");
				fs.rename(file.upload.path, "/tmp/test.png");
			}
		});
		//reminder to check that Content-Type is correct
	//we are goingt o response with the image that is located at /tmp/test.png 
	//but we shorted it to our show function below
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("received image: <br/>");
	response.write("<img src='/show' />")
	//querystring.parse(postData).text);
	response.end();
	});
}

//this is how we show the picture, currently its just pulling from my /tmp file location
function show(response) {
	console.log("Request handler 'show' was called.");
	response.writeHead(200, {"Content-Type": "image/png"});
	fs.createReadStream("/tmp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;