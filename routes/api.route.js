/**
 * Created by parientu on 1/14/2018.
 */


var express = require('express');

var router = express.Router();
var todos  = require('./api/todos.route');
var users = require('./api/users.route');

router.use('/todos',todos);
router.use('/users',users);

module.exports = router;