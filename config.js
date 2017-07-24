exports.docker = {
  whoisHost: 'whois.verisign-grs.com',
  whoisPort: 43,
  logDb: 'mongodb://mongodb:27017/whois',
};

exports.local = {
  whoisHost: 'whois.verisign-grs.com',
  whoisPort: 43,
  logDb: 'mongodb://localhost:27017/whois'
};
