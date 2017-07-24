require('./app');
require('angular-mocks/angular-mocks');

// Include *.spec.js files
var context = require.context('./app', true, /.+\.spec\.js$/);
context.keys().forEach(context);
