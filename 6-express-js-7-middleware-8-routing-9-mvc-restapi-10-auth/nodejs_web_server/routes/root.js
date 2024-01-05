const express = require('express');
const path = require('path');
const router = express.Router();

router.get('^/$|/index(.html)?', async (_, res) => { // we can put regEx to the first parameter
  // res.sendFile('./views/index.html', { root: __dirname })
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
});

router.get('/new-page(.html)?', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'))
});
router.get('/old-page(.html)?', (_, res) => {
  res.redirect(301, '/new-page.html') // send 302 by default actually we want 301
})

module.exports = router;