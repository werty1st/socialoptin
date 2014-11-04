//export PORT=8080 && node -e "console.log(process.env.PORT);
var path = require('path');
var express = require('express');
var app = express();
    app.enable('trust proxy');
    
    app.use('/settings/',express.static(__dirname+'/html'));
    app.use('/css/',express.static(__dirname+'/html/css'));
    app.use('/js/',express.static(__dirname+'/html/js'));

var server = app.listen(process.env.PORT || 3002, function() {
    console.log('Listening on port %d', server.address().port);
});


// app.get('/settings', function(req, res){
//     res.redirect(301, 'http://www.zdf.de/ZDFxt/module/socialoptin/settings/')
// });


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



