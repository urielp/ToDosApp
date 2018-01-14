/**
 * Created by parientu on 1/14/2018.
 */


var express = require('express');

var router = express.Router();
var todos  = require('./api/todos.route');

router.use('/todos',todos);


module.exports = router;