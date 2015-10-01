#!/usr/bin/env node

'use strict';

var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    app = express();

var testingID = 'abf0123ff';

//////////////////////////
// Application settings //
//////////////////////////

app.set('x-powered-by', false);
app.disable('etag', false);
app.enable('case sensitive routing');

////////////////////////////
// Application Middleware //
////////////////////////////

app.use(bodyParser.json());

app.use(function (req, res, next) {
  // Log the request
  console.log('%s - %s', req.method, req.originalUrl);
  next();
});

// Require routes
require('./app/routes')(app);

///////////////////
// Error handler //
///////////////////

app.use(function(err, req, res, next) {
  console.error(err.stack);
  next(err);
});

app.use(function(err, req, res, next) {
  return res.status(500).send({
    error: 'Something went wrong!'
  });
});

var server = http.createServer(app).listen(8080, function() {
  var address = server.address();
  console.log('Mock API app listening at http://%s:%s', address.address, address.port);
});