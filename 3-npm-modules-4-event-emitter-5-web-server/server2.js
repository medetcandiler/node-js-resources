const http = require('http');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = require('./logEvents');

const EventEmitter = require('events');

const myEmitter = new EventEmitter();

myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 4000;

const serveFile = async (filePath, contentType, res) => {
  try {
    const rawData = await fsPromises.readFile(filePath,
      contentType.includes('image') ? '' : 'utf8'
    );
    const data = contentType === 'application/json'
      ? JSON.parse(rawData) : rawData
    res.writeHead(filePath.includes('404') ? 404 : 200, { 'Content-Type': contentType });
    res.end(
      contentType === 'application/json' ? JSON.stringify(data) : data
    );
  } catch (err) {
    console.log(err);
  }
}

const server = http.createServer(async (req, res) => {
  myEmitter.emit('log', `${req.url}\t${req.method}`, 'server2LogEvents.txt');
  const extension = path.extname(req.url);
  let contentType;
  switch (extension) {
    case '.css':
      contentType = 'text/css'
      break;
    case '.js':
      contentType = 'text/javascript'
      break;
    case '.json':
      contentType = 'application/json'
      break;
    case '.png':
      contentType = 'image/png'
      break;
    case '.jpg':
      contentType = 'image/jpg'
      break;
    case '.txt':
      contentType = 'text/plain'
      break;
    default:
      contentType = 'text/html'
  }
  let filePath =
    contentType === 'text/html' && req.url === '/'
      ? path.join(__dirname, 'views', 'index.html')
      : contentType === 'text/html' && req.url.slice(-1) === '/'
        ? path.join(__dirname, 'views', req.url, 'index.html')
        : contentType === 'text/html'
          ? path.join(__dirname, 'views', req.url)
          : path.join(__dirname, req.url);

  if (!extension && !req.url.slice(-1) === '/') filePath += '.html'

  if (fs.existsSync(filePath)) {
    serveFile(filePath, contentType, res)
  } else {
    serveFile(path.join(__dirname, 'views', '404.html'), contentType, res);
  }

})

server.listen(PORT, () => {
  console.log(`server runing on port: ${PORT}`);
})

