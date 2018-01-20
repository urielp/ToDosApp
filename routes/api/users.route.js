/**
 * Created by parientu on 1/17/2018.
 */

var express = require('express');

var router =express.Router();

var UsersController =require('../../controller/users.controller');

var User = require('../../models/users.model');

//main users
router.get('/',UsersController.usersWelcome);


//testing async
//router.post('/test',UsersController.myTestAsync);

/*
//authenticate users
router.post('/authenticate',UsersController.authenticateUserupdated);
*/


// route middleware to verify a token
/*router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
console.log(token);
    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});*/


//getting users list
// router.get('/users',(req,res)=>{
//     User.find({},(err,users)=>{
//         res.json(users);
//     }}));



router.get('/usersList',(req,res)=>{
    console.log("Hello World!");
    User.find({},(err,users)=>{
        res.json(users);
    })
});

router.get('/user/:id',UsersController.getUser
/*    (req,res)=>{
    User.find({_id:id},(err,users)=>{
        res.json(users);
    })

}*/);
module.exports = router;