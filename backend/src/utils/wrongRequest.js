const appEmitter = require('./appEmitter');

const wrongRequest = (code, data) => {
  appEmitter.emit('failure', code, data);
};

module.exports = wrongRequest;
