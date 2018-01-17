/**
 * Created by parientu on 1/17/2018.
 */

var express = require('express');

var router =express.Router();

var UsersController =require('../../controller/users.controller');
var User = require('../../models/users.model');

//main users
router.get('/',UsersController.usersWelcome);


//authenticate users
router.post('/authenticate',UsersController.authenticateUser);

//middleware
router.use((req,res,next) =>{

    console.log("Starting to Verify User!");
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token)
    {

        UsersController.tokenVerification(token,req.app.get('superSecret'),(response,err) =>{
                if(err)
                {
                    console.log(err.message);
                    return res.json({success:false,message:'Failed to authenticate token. '});
                }
                else{
                    console.log(response);
                    req.decoded = decode;
                    next();
                }

        });
    }
     else{
         return res.status(403).send({success:false,message:'No token provided'});
     }
})
    // var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // console.log(token);
    // if(token){
    //
    //     UsersController.tokenVerification(token);
    //     jwt.verify(token,req.app.get('superSecret'),function(err,decode) {
    //         if(err){
    //             console.log(err.message);
    //             return res.json({success:false,message:'Failed to authenticate token. '});
    //         }
    //         else{
    //             req.decoded = decode;
    //             next();
    //         }
    //     })
    // }
    // else{
    //     return res.status(403).send({success:false,message:'No token provided'});
    // }

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
module.exports = router;