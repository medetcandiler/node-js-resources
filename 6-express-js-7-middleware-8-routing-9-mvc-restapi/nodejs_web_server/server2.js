const express = require('express');
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const PORT = process.env.PORT || 3500;
const app = express();

app.use(logger);

const whiteList = ['http://localhost:3500'];
const corsOpt = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}
app.use(corsOpt);

app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')))


// chaining handlers
app.get('/hello(.html)?', (req, res, next) => {
  console.log('attempted to load hello.html')
  next()
}, (req, res) => {
  res.send('hello world')
})

// route handlers
const one = (req, res, next) => {
  console.log('first');
  next();
}
const two = (req, res, next) => {
  console.log('two');
  next();
}
const three = (req, res) => {
  console.log('three')
  res.send('finished');
}
app.get('/chain(.html)?', [one, two, three])


// above and below code are same but above syntax better (app.all)

// app.get('/*', (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
// })


app.all('*', (req, res) => {
  res.status(400).sendFile(path.join(__dirname, 'view'))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// StatusCodes 
/* 
--200--
200	OK
201	Created
202	Accepted
203 	Non-Authoritative Information
204	No Content
--300--
300	Multiple Choices
301	Moved Permanently
302	Found (Previously "Moved Temporarily")
303	See Other
304	Not Modified
--400--
400	Bad Request
401	Unauthorized
402	Payment Required
403	Forbidden
404	Not Found
405	Method Not Allowed 
*/