//export PORT=8080 && node -e "console.log(process.env.PORT);

var express = require('express');
var app = express();
    app.enable('trust proxy');
    
    //app.use('/',express.static(__dirname+'/html'));

var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port %d', server.address().port);
});

var io = require('socket.io').listen(server); // this tells socket.io to use our express server


app.get('/', function(req, res){
  res.send('Hello World');
});



function socketfunction (socket) {

    var applogic = new Applogic(socket);

    //vom client aufgerufen
    socket.on('socket.renderImageRequest', function (originalEmbeddcode) {
        console.log('app.socket.renderImageRequest');
        applogic.emit('applogic.renderImageRequest',originalEmbeddcode);
    });

    // Success!  Now listen to messages to be received
    socket.on('message',function(event){
        console.log('Received message from client!',event);
    });

    socket.on('disconnect',function(){
        console.log('Server has disconnected');
    });

    io.sockets.on('connection', function (socket) {
        console.log('A new user connected!');
    });

};
var ws1 = io.of('/t/');
    ws1.on('connection', socketfunction);

var ws2 = io.of('/');
    ws2.on('connection', socketfunction);





