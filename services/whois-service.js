const net = require('net');
const dns = require('dns');

function WhoisService(host, port) {
  this.host = host;
  this.port = port;
  this.serviceIp = null;
}

WhoisService.prototype.search = function (domain) {
  return new Promise((resolve, reject) => {
    let response = '';
    const socket = new net.Socket();
    socket.connect(this.port, this.host);
    socket.on('connect', () => this.sendRequest(socket, domain));
    socket.on('data', data => {
      response += data;
    });
    socket.on('end', () => resolve(response));
    socket.on('error', err => {
      reject({ message: err.message })
    });
  });
};

WhoisService.prototype.getServiceIp = function (cb) {
  return new Promise((resolve, reject) => {
    if (this.serviceIp) {
      return resolve(this.serviceIp);
    }

    dns.lookup(this.host, function (err, address) {
      if (err) {
        reject(err);
      }

        this.serviceIp = address;
      resolve(address);
    }.bind(this));
  });
};

WhoisService.prototype.sendRequest = function (socket, domain) {
  console.log('send request', domain);
  socket.write(domain + '\r\n');
};

module.exports = WhoisService;
