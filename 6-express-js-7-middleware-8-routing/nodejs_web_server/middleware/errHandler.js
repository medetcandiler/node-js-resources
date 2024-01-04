const { logEvents } = require('./logEvents');

// the order of err, req, res, next is important otherwise the middleware does not work and even if you do not use next yo ushould include or just put _ for not used parameters
const errorHandler = (err, _, res ) => {
  logEvents(`${err.name} ${err.message}`, 'errLog.txt')
  res.status(500).send(err.message);
}
module.exports = errorHandler ;