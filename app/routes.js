'use strict';

module.exports = function(app) {

  var controller = require('./controller');

  app.route('/tours')
    .post(controller.createTour);

  app.route('/tours/:tourId')
    .get(controller.getTour)
    .put(controller.hasValidAPIKey, controller.updateTour)
    .delete(controller.deleteTour);

  app.param('tourId', controller.tourById);

};
