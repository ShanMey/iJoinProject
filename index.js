var http = require('http')
var fs = require('fs');

var port = 8888;
function onRequest(request, response) {
  console.log("Request received.");
  var formatFile = fs.readFile('./client/index.html', function(err, file) {
    if(err) {
      console.log("error reading file");
      return;
    }
  });
  console.log(formatFile);
  response.writeHead(200, {"Content-Type": "text/html"});
  response.send(formatFile);
  response.end();
}

http.createServer(onRequest).listen(port);
