console.log('hello world');

// console.log(global);


const os = require('os');
const path = require('path')

const { add, subtract, multiply, divide } = require('./math');

console.log(add(3,5))
console.log(subtract(3,5))
console.log(multiply(3,5))
console.log(divide(3,5))

// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())


// console.log(__dirname, '__dirname')
// console.log(__filename,'__filename')

// console.log(path.dirname(__dirname), 'path.dirname(__dirname)')
// console.log(path.dirname(__filename), 'path.dirname(__filename)')
// console.log(path.basename(__filename))
// console.log(path.extname(__filename))

// console.log(path.parse(__filename))