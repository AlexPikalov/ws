var MongoClient = require('mongodb').MongoClient;

function LogService(db) {
  this.connection = db.collection('logs');
}

LogService.connect = function (addr) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(addr, (err, db) => {
      if (err) {
        reject(err);
      } else {
        resolve(new LogService(db));
      }
    });
  });
};

LogService.prototype.log = function (data) {
  return new Promise((resolve, reject) => {
    this.connection.insertOne(data, err => {
      if (err) {
        reject(err)
      } else {
        resolve(null);
      }
    });
  });
};

module.exports = LogService;
