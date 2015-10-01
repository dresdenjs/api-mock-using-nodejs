#!/usr/bin/env node

'use strict';

var express = require('express'),
    http = require('http'),
    app = express();

var testingID = 'abf0123ff';

app.get('/', function (req, res) {
  res.json({ message: 'Hello World!'});
});

var server = http.createServer(app).listen(8080, function() {
  var address = server.address();
  console.log('Mock API app listening at http://%s:%s', address.address, address.port);
});