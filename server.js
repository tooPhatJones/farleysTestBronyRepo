const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
//const httpPort = 9999;
const httpsPort = 3001;
app = express()

var key = fs.readFileSync('/etc/letsencrypt/live/www.typecheck.website/privkey.pem');
var cert = fs.readFileSync('/etc/letsencrypt/live/www.typecheck.website/fullchain.pem');

var credentials = {
  key: key,
  cert: cert
};
//the following line is for the certbot verification step. after that I can remove it if i want. 
app.use(express.static('static'));

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
  let date = new Date();
   res.send('Hello World.');
  console.log('request logged '+ date.toLocaleString())
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);


//httpServer.listen(httpPort, () => {
  //console.log("Http server listing on port : " + httpPort)
//});

httpsServer.listen(httpsPort, () => {
  console.log("Https server listing on port : " + httpsPort)
});


//curl http://localhost:9999
