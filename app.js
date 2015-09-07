//export PORT=8080 && node -e "console.log(process.env.PORT);
var log = require('npmlog');
//var stream = require('logrotate-stream')
//  , toLogFile = stream({ file: 'log/new.log', size: '100k', keep: 3 });
//    log.stream = toLogFile;

log.level = 'info';

var path = require('path');
var express = require('express');
var app = express();
    app.enable('trust proxy');


    app.use(function(req, res, next) {
        // var host = req.headers["x-forwarded-host"] || "www.zdf.de";
        //     host = req.protocol + "://" + host;
        var host = req.protocol + "://" + "www.zdf.de";

        log.info((new Date).toISOString(),"got req from:", req.protocol + "://" + req.headers["x-forwarded-host"] || "www.zdf.de");


        res.setHeader("Edge-Control", "max-age=5m");
        res.setHeader("Cache-Control", "max-age=5m");
        res.setHeader("Access-Control-Allow-Origin", host);
        res.setHeader("Access-Control-Allow-Methods", "GET,POST");       
        res.setHeader("Content-Security-Policy", "default-src 'unsafe-inline' "+host);
        res.setHeader("X-Content-Security-Policy", "default-src 'unsafe-inline' "+host);
        res.setHeader("X-WebKit-CSP", "default-src 'unsafe-inline' "+host);

        return next();
    });

    app.use('/settings/',express.static(__dirname+'/html'));
    app.use('/css/',express.static(__dirname+'/html/css'));
    app.use('/fonts/',express.static(__dirname+'/html/fonts'));
    app.use('/js/',express.static(__dirname+'/html/js'));

var server = app.listen(process.env.PORT || 3002, function() {
    log.info( 'Listening on port ' + server.address().port );
});


// app.get('/settings', function(req, res){
//     res.redirect(301, 'http://www.zdf.de/ZDFxt/module/socialoptin/settings/')
// });


app.get('/hub.html', function(req, res){
    res.sendFile(path.join(__dirname, 'html', 'hub.html'));
});

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'html', 'demo.html'));
});



