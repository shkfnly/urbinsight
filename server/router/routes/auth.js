var express = require('express');
var router = express.Router();
var moment = require('moment');
var _ = require('underscore');
var auth = require('./authLogic.js')

router.post('/', auth.login)

module.exports = router;