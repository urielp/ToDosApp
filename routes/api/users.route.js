/**
 * Created by parientu on 1/17/2018.
 */

var express = require('express');
var router =express.Router();
var UsersController =require('../../controller/users.controller');
var User = require('../../models/users.model');
var auth =require ('./auth');


//main users
router.get('/',UsersController.usersWelcome);

router.get('/usersList',auth.auth,(req,res)=>{
    console.log("Hello World!");
    User.find({},(err,users)=>{
        res.json({success:true,data:users,message:'Users List Sent'});
    })
});

router.get('/user/:id',auth.auth,UsersController.getUser
/*    (req,res)=>{
    User.find({_id:id},(err,users)=>{
        res.json(users);
    })

}*/);
module.exports = router;