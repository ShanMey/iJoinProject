var Percolator = require('percolator').Percolator
var async = require('async');
var fs = require('fs');

var port = 8888;
var server = Percolator({'port':port, 'autoLink': false, 'staticDir': "../client"});

fs.readFile('./index.html', function(err, file) {
  if(err) {
    return;
  }
})

server.listen();
