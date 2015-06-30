//export PORT=8080 && node -e "console.log(process.env.PORT);
var path = require('path');
var express = require('express');
var app = express();
    app.enable('trust proxy');


    app.use(function(req, res, next) {
        // var host = req.headers["x-forwarded-host"] || "www.zdf.de";
        //     host = req.protocol + "://" + host;
        var host = req.protocol + "://" + "www.zdf.de";
        console.log("get req from ", req.protocol + "://" + req.headers["x-forwarded-host"] || "www.zdf.de");


        res.setHeader("Edge-Control", "no-store, max-age=5m");
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
    console.log('Listening on port %d', server.address().port);
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



