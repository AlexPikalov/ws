function whoisMiddlewareFactory(service) {
  return function (req, res, next) {
    service.search(req.query.domain)
      .then(function (details) {
        req.ctx = { details: details };
        res.send({ data: details });
      })
      .catch(function (err) {
        res.statusCode = 500;
        res.send(JSON.stringify(err));
      })
      .then(() => next());
  };
}

module.exports = whoisMiddlewareFactory;
