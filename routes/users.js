var express = require('express');
var router = express.Router();
var User = require('../models/users.model');
var jwt    = require('jsonwebtoken');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//authenticating  a user
router.post('/authenticate',function(req,res) {
  console.log('authenticate');

  User.findOne({username:req.body.username},
  (err,user)=>{
    if(err){
      console.log(err.message);
      throw err;
    }
    if(!user){
      console.log('User not found!');
      res.json({success:false,message:'Authentication failed.User not found.'});

    }
    else if(user){
      console.log('password verification');
      if(user.password!=req.body.password){
        res.json({success:false,message:"authentication failed.Wronf password"});
      }
      else
      {
        console.log('generating token');
        const payload ={
          admin:user.admin
        };

        var token =jwt.sign(payload,req.app.get('superSecret'),{
          expiresIn:1440
        });
        res.json({
          sucess:true,
          message:'Enjoy your token',
          toekn:token
        })
      }
    }
  })
});


router.get('/setup',function(req,res){
var Uriel = new User({
  username:'Uriel',
  password:'12345',
  admin:true
});

  Uriel.save(function(err){
  if(err){
    console.log(err.message);
    throw err;
  }
  console.log('User saved');
  res.json({success:true});
})
});




router.get('/users',(req,res)=>{
  User.find({},(err,users)=>{
  res.json(users);
});
})
module.exports = router;
