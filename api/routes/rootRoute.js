'use strict';
module.exports = function(app) {
  var root = require('../controllers/rootController.js');

  // rootRoutes 
  app.route('/')
    .get(root.index);
}