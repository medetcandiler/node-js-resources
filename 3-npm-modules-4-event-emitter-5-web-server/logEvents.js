const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, fileName) => {
  const time = format(new Date(), 'dd/MM/yyyy\tHH:mm:ss');
  const logItem = `${time}\t${uuid()}\t${message}\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, 'logs'))) {
      fs.mkdir(path.join(__dirname, 'logs'));
    }
    await fsPromises.appendFile(path.join(__dirname, 'logs', fileName), logItem)
  } catch (err) {
    console.log(err)
  }

}

module.exports = logEvents;