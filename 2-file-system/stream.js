const fs = require('fs');

//readable stream
// const rs = fs.createReadStream('./files/lorem.txt', { encoding: 'utf8' });
// writable stream
// const ws = fs.createWriteStream('./files/new-lorem.txt');
/* 
rs.on('data', (dataChunk) =>
  ws.write(dataChunk)
) */

const testrs = fs.createReadStream('./files/test.txt', 'utf8');
const testws = fs.createWriteStream('./files/new-file.txt');

testrs.on('data', (dataChunk) => {
  console.log(dataChunk, '\ttest.txt contet');
  testws.write(dataChunk)
})

// testrs.on('data', (dataChunk) => {
//   testws.write(dataChunk)
// })

//same as above
// rs.pipe(ws);