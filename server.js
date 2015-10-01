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


app.get('/', function (req, res) {
  res.json({ message: 'Hello World!'});
});

/////////////////
// Create Tour //
/////////////////
app.post('/tours', function(req, res) {

  // Validate submitted data
  if (new Date(req.body.time) < new Date()) {
    return res.status(400).json({
      error: 'Invalid paramters provided.'
    });
  }

  res.status(201).json(
    {
      id: testingID,
      status: '1'
    }
  );
});

/////////////////////
// Get Tour status //
/////////////////////
app.get('/tours/:tourId', function(req, res) {

  // Create an ETA set 30 minutes in the future
  var d = new Date();
  d.setMinutes(d.getMinutes() + 30);

  res.json(
    {
      id: testingID,
      status: '1',
      eta: d.toISOString()
    }
  );
});

/////////////////
// Cancel Tour //
/////////////////
app.delete('/tours/:tourId', function(req, res) {
  res.status(204).end();
});

/////////////////
// Update Tour //
/////////////////
app.put('/tours/:tourId', function(req, res) {

  // app.params contains all params
  console.log('Updating Tour %s', req.params.tourId);

  res.json(
    {
      id: testingID,
      status: '1'
    }
  );
});


/////////////////////
// Param callbacks //
/////////////////////

app.param('tourId', function(req, res, next, id) {
  if (id !== testingID) {
    return res.status(404).json({
      error: 'Not found'
    });
  }
  next();
});

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