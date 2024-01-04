const express = require('express');
const path = require('path');

const router = express.Router();

router.get('^/$|/index(.html)?', async (req, res) => { // we can put regEx to the first parameter
  res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'));
});

router.get('/test(.html)?', async (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'));
});


module.exports = router;