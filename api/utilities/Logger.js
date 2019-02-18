require('dotenv').config();

const LoggerService = require('@ubpphdev/chicharon');

module.exports = (new LoggerService(process.env.LOG_LEVEL,
    process.env.LOG_COLORIZE)).log;
