const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
// const EventEmitter = require('events');
// const Emitter = new EventEmitter();
Emitter.on('log', (msg, logFileName) => logEvents(msg, logFileName));

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
  } catch (err) {
    console.log(err);
  }
}
const logger = (req, res, next) => {
  // Emitter.emit('log', `${req.method} ${req.headers.origin} ${req.url}`, 'reqLogs.txt')
  logEvents(`${req.method} ${req.headers.origin} ${req.url}`, 'reqLogs.txt');
  next();
}
module.exports = { logEvents, logger };