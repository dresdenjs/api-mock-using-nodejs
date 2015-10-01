#!/usr/bin/env node

'use strict';

var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    app = express();

var testingID = 'abf0123ff';

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.json({ message: 'Hello World!'});
});

/////////////////
// Create Tour //
/////////////////
app.post('/tours', function(req, res) {

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

  res.json(
    {
      id: testingID,
      status: '1',
      eta: '2015-10-02T13:30:00.719Z'
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
  res.json(
    {
      id: testingID,
      status: '1'
    }
  );
});

var server = http.createServer(app).listen(8080, function() {
  var address = server.address();
  console.log('Mock API app listening at http://%s:%s', address.address, address.port);
});