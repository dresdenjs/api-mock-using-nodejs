'use strict';

var testingID = 'abf0123ff';

/**
 * Middleware to CREATE a Tour.
 */
exports.createTour = function(req, res) {
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
};

/**
 * Middleware to GET a Tour.
 */
exports.getTour = function(req, res) {
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
};

/**
 * Middleware to CANCEL a Tour.
 */
exports.deleteTour = function(req, res) {
  res.status(204).end();
};

/**
 * Middleware to UPDATE a Tour.
 */
exports.updateTour = function(req, res) {
  // app.params contains all params
  console.log('Updating Tour %s', req.params.tourId);

  res.json(
    {
      id: testingID,
      status: '1'
    }
  );
};

/**
 * Param callback for tour ID
 */
exports.tourById = function(req, res, next, id) {
  if (id !== testingID) {
    return res.status(404).json({
      error: 'Not found'
    });
  }
  next();
};

/**
 * Authentication middleware.
 */
exports.hasValidAPIKey = function(req, res, next) {
  var apikey = req.get('X-API-Key');
  if (!apikey || apikey !== 'dresdenjs.io') {
    return res.status(401).json({
      error: 'Missing API Key'
    });
  }
  next();
};