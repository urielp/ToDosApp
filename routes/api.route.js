/**
 * Created by parientu on 1/14/2018.
 */


var express = require('express');
var jwt    = require('jsonwebtoken');
var router = express.Router();
var todos  = require('./api/todos.route');
var users = require('./api/users.route');
var login =require('./api/login');

function test(req,res,next)
{
    console.log('hello world!');
    return next
}

router.use('/login',login);

router.use('/todos',todos);
router.use('/users',users);

module.exports = router;