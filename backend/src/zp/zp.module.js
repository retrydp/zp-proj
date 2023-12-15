const zpController = require('./zp.controller');
const http = require('http');
const commonConst = require('../utils/constants.js');

const zpModule = () => {
  const { PORT, HOSTNAME } = process.env;

  const server = http.createServer(zpController);

  server.listen(PORT, HOSTNAME, () => console.log(commonConst.SERVER_UP, PORT));

  server.on('error', (err) => {
    if (err.code === 'EACCES') {
      console.log(`No access to ${PORT}`);
    }
  });
};

module.exports = zpModule;
