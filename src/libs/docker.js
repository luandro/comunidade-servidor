const Docker = require('dockerode')

module.exports = new Docker({protocol:'http', host: '127.0.0.1', port: 3000})
