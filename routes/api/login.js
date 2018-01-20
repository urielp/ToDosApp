/**
 * Created by sivanram on 19.1.2018.
 */

var express = require('express');
var User = require('../../models/users.model');
var router = express.Router();
var UsersController =require('../../controller/users.controller');

router.get('/', function(req, res) {

    res.json({ message: 'Welcome to the coolest API on earth!' });
});

//authenticate users
router.post('/authenticate',UsersController.authenticateUserupdated);


module.exports = router;