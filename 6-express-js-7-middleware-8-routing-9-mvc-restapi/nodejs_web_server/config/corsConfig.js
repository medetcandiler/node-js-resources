const whiteList = ['https://www.mysite.com', 'http://localhost:3500', 'https://127.0.0.1:5500', 'https://www.google.com'];
const corsOpt = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // allow
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
}

module.exports = corsOpt;