var sys = require('sys'),
    http = require('http'),
    io = require('socket.io')
    server = http.createServer(),
    socket = io.listen(server),
    json = JSON.stringify,
    log = sys.puts;

server.listen(8000);

var queue = new Array();

socket.on('connection', function(client){
  var clientR = Math.random()*255;
  var clientG = Math.random()*255;
  var clientB = Math.random()*255;
  
  var req = json({mode:"init", red:clientR, green:clientG, blue:clientB});
  client.send(req);
  
  client.on('message', function(message){
  	try {
      request = JSON.parse(message);
    } catch (SyntaxError) {
      log('Invalid JSON:');
      return false;
    }
    client.broadcast(json(request));
  });
});