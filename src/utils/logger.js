const debug = require('debug')('app:logger');

module.exports = {
  info: (msg) => debug(msg),
  error: (msg) => debug(msg),
  warn: (msg) => debug(msg),
};
