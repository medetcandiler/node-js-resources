const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOpt = require('./config/corsConfig');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errHandler');

const PORT = process.env.PORT || 3500;
// custom middleware logger
// there are 3 type of middlewares 1-built-in, 2-custom, 3-third party
// in custom middlewares we need to add next() to continue but in built-in middlewares it is added by default no need to add it.
app.use(logger);

// cross origin resource sharing
app.use(cors(corsOpt));

//built-in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// build-in middleware for json 
app.use(express.json());

// serve static files
// with this implementation all the css and img and other files serves as a static 
// after appliyn static files, do not forget to look the href of style links eg. '../css/style.css/ no need for this syntax because underde public this css file will be available like this 'css/style.css'
app.use('/', express.static(path.join(__dirname, '/public')));
//adding static files like css images for subdir
app.use('/subdir', express.static(path.join(__dirname, '/public')));

//ROUTES
//serve the router after serving static files 
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));

app.all('*', (req, res) => {
  res.status(404);// if there is 404 page it does not change 
  if (req.accepts('html')) {// return Boolean 
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 not found' })
  } else {
    res.type('txt').send('404 not fount')
  }
});

//built-in error handler middleware in expressjs
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



