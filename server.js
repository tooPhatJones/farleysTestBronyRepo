const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const httpPort = 9999;
const httpsPort = 3001;
app = express()

var key = fs.readFileSync(__dirname + '/rootCA.key');
var cert = fs.readFileSync(__dirname + '/rootCA.pem');

var credentials = {
  key: key,
  cert: cert
};
 

// redirect http requests to the https server.
app.all('*', (req, res, next) => {
    if (req.secure) {
      return next();
    } else {
        console.log(`Redirecting to: https://${req.hostname}:${httpsPort}${req.url}`);
        res.redirect(301, `https://${req.hostname}:${httpsPort}${req.url}`);
    }
});

//GET home route
app.get('/', (req, res) => {
   res.send('Hello World.');
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);


httpServer.listen(httpPort, () => {
  console.log("Http server listing on port : " + httpPort)
});

httpsServer.listen(httpsPort, () => {
  console.log("Https server listing on port : " + httpsPort)
});


//curl http://localhost:9999
