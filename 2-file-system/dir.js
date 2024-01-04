const fs = require('fs');
const path = require('path');

//make directory
if (!fs.existsSync('./new')) {
  fs.mkdir('./new', (err) => {
    if (err) throw err;
    console.log('made')
  })
}

//remove directory
if(fs.existsSync('./new')){
  fs.rmdir(path.join(__dirname, 'new'), err => {
    if(err) throw err;
    console.log('removed')
  } )
}

process.on('uncaughtException', err => {
  console.log(`There was an uncaught error: ${err}`);
  process.exit(1);
})