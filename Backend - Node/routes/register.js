console.log("Inside Router")
const express = require('express');
const router  = express.Router();
const { register } = require('../api/register');


router.route('/').post(register);


module.exports = router;