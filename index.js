var process = require('process');
var express = require('express');
var bodyParser = require('body-parser');
var fallback = require('express-history-api-fallback');
var helmet = require('helmet');
var isDocker = process.env.DOCKER;

var config = require('./config')[isDocker ? 'docker' : 'local'];

// prepare whois service and middleware
var WhoisService = require('./services/whois-service');
var whoisService = new WhoisService(config.whoisHost, config.whoisPort);
var whoisMiddlewareFactory = require('./middleware/whois');

// prepare logger service and middleware
var LogService = require('./services/log-service');
var log = LogService.connect(config.logDb);
var logMiddlewareFactory = require('./middleware/logger');

const port = process.env.PORT || 3000;

// connect to DB and start server
log.then(init, console.error.bind(console));

function init(logService) {
  var app = express();
  const dist = './ui/dist';

  // enable helmet security protection
  app.use(helmet());

  app.use(bodyParser.json());
  app.use(express.static(dist));

  const whoisMiddleware = whoisMiddlewareFactory(whoisService);
  const logMiddleware = logMiddlewareFactory(logService);
  app.get('/domainSearch', whoisMiddleware, logMiddleware);

  app.use(fallback('index.html', { root: dist }));

  app.listen(port, function () {
    console.log('Listening on port ' + port);
  });
}