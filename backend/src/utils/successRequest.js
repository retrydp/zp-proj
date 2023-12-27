const appEmitter = require('./helpers/appEmitter');

const successRequest = ( data) => {
  appEmitter.emit('success', 200, data);
};

module.exports = successRequest;
