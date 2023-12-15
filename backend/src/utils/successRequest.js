const appEmitter = require('./appEmitter');

const successRequest = ( data) => {
  appEmitter.emit('success', 200, data);
};

module.exports = successRequest;
