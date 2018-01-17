/**
 * Created by parientu on 1/17/2018.
 */

var express = require('express');

var router =express.Router();

var UsersController =require('../../controller/users.controller');


//main users
router.get('/',UsersController.usersWelcome);


//authenticate users
router.post('/authenticate',UsersController.authenticateUser);



module.exports = router;