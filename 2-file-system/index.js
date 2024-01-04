const fsPromises = require('fs').promises;
const path = require('path');

//readFile
// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, content) => {
//   if (err) throw err;
//   console.log(content);
// })



//writeFile | appendFile | renameFile methods 
// it is callback hell, is not it? 
/* fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'hi my name is medet', err => {
  if (err) throw err;
  console.log('write complete');
  fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nindeed its medetcan', err => {
    if (err) throw err;
    console.log('append complete');

    fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'), err => {
      if (err) throw err;
      console.log('rename complete')
    });
  });
}) */


const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(path.join(__dirname, 'files', 'test.txt'), 'utf-8');
    console.log(data);
    await fsPromises.writeFile(path.join(__dirname, 'files', 'new-test.txt'), data);
    await fsPromises.appendFile(path.join(__dirname, 'files', 'new-test.txt'), '\n\nAppended new texts');
    await fsPromises.rename(path.join(__dirname, 'files' , 'new-test.txt'), path.join(__dirname, 'files', 'renamed-test.txt'))
    await fsPromises.unlink(path.join(__dirname, 'files', 'renamed-test.txt'));
  } catch (err) {
    console.log(err)
  }
}

fileOps()


// const fileOps = async () => {
//   try {
//     const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
//     await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt')) // delete starter.txt file 
//     await fsPromises.writeFile(path.join(__dirname, 'files', 'promises.txt'), data);
//     await fsPromises.appendFile(path.join(__dirname, 'files', 'promises.txt'), '\n\nnew text about to come promises txt filee');
//     await fsPromises.rename(path.join(__dirname, 'files', 'promises.txt'), path.join(__dirname, 'files', 'newPromises.txt'));
//     const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'newPromises.txt'), 'utf8');
//     console.log(newData);
//   } catch (err) {
//     console.log(err);
//   }
// }

// fileOps();

console.log('helloo...');

process.on('uncaughtException', err => {
  console.log(`There was an uncaught error: ${err}`);
  process.exit(1)
})