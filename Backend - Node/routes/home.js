const express = require('express');
const router  = express.Router();
const { home } = require('../api/home');


// router.route('/').post(login);
router.route('/').get(home);

module.exports = router;