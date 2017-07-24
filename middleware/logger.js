function logMiddlewareFactory(service) {
  return function (req, res, next) {
    const domain = req.query.domain;
    const time = new Date();
    const details = req.ctx && req.ctx.details;
    const ok = res.statusCode >= 200 && res.statusCode < 300;
    service.log({ domain: domain, time: time, ok: ok, details: details })
      .catch(function (err) {
        console.error('Log Server Error: ', err);
      })
      .then(() => next());
  };
}

module.exports = logMiddlewareFactory;
