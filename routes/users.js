var express = require('express');
var router = express.Router();
var User = require('../models/users.model');
var jwt    = require('jsonwebtoken');


/* GET users listing. */
 router.get('/', function(req, res, next) {
   res.send('respond with a resource');
 });

// router.get('/setup',function(req,res){
//   var Uriel = new User({
//     username:'Uriel2',
//     password:'12345',
//     admin:true
//   });
//
//   Uriel.save(function(err){
//     if(err){
//       console.log(err.message);
//       throw err;
//     }
//     console.log('User saved');
//     res.json({success:true});
//   })
// });


//authenticating  a user
router.post('/authenticate',(req,res) => {
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
  });
});


//middleware
router.use((req,res,next) =>{

  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log(token);
if(token){
    jwt.verify(token,req.app.get('superSecret'),function(err,decode) {
      if(err){
        console.log(err.message);
        return res.json({success:false,message:'Failed to authenticate token. '});
      }
      else{
        req.decoded = decode;
        next();
      }
    })
}
else{
  return res.status(403).send({success:false,message:'No token provided'});
}

});




//getting users list
router.get('/users',(req,res)=>{
  User.find({},(err,users)=>{
  res.json(users);
});


//getting user info by id
router.get('/user/:id',(req,res)=> {
    res.json({message: 'getting users by id'});
});


//removing user info by id
router.delete('/user/remove/:id',(req,res)=> {
    res.json({message: 'TODO:remove users by id'});
});

//update user info by id
router.put('/user/update/:id',(req,res)=> {
    res.json({message: 'TODO:update users by id'});
});
})


module.exports = router;
