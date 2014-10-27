//export PORT=8080 && node -e "console.log(process.env.PORT);
var path = require('path');
var express = require('express');
var app = express();
    app.enable('trust proxy');
    
    app.use('/settings',express.static(__dirname+'/html'));
    app.use('/css',express.static(__dirname+'/html/css'));
    app.use('/js',express.static(__dirname+'/html/js'));

var server = app.listen(process.env.PORT || 3002, function() {
    console.log('Listening on port %d', server.address().port);
});

var io = require('socket.io').listen(server); // this tells socket.io to use our express server

app.get('/hub.html', function(req, res){
    var host = req.headers["x-forwarded-host"] || "www.zdf.de";
    console.log("get hub from ",host);
    res.sendFile(path.join(__dirname, 'html', 'hub.html'));
});

app.get('/', function(req, res){
    var host = req.headers["x-forwarded-host"] || "www.zdf.de";
    console.log("get / from ",host);
    res.sendFile(path.join(__dirname, 'html', 'testjs.html'));

});



function socketfunction (socket) {


    //vom client aufgerufen
    socket.on('socket.save', function (data) {
        console.log('socket.save',data);
    });

    socket.on('socket.load', function (data) {
        console.log('socket.load',data);
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

var ws1 = io.of('/');
    ws1.on('connection', socketfunction);





