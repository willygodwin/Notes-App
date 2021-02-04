const express = require('express');
const router = express.Router();

const apiRoutes = require('./apiRoutes.js');
const htmlRoutes = require('./htmlRoutes.js');

router.use(apiRoutes);
router.use(htmlRoutes);

module.exports = router;