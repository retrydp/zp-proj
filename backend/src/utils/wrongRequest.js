const appEmitter = require('./helpers/appEmitter');

const wrongRequest = (code, data) => {
  appEmitter.emit('failure', code, data);
};

module.exports = wrongRequest;
