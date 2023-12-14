const Emitter = require("node:events");

const appEmitter = new Emitter();

module.exports = appEmitter;