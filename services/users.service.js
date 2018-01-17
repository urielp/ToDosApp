/**
 * Created by parientu on 1/17/2018.
 */

//getting the User model
var User = require('../models/users.model');
var jwt    = require('jsonwebtoken');

_this = this;



exports.usersWelcome = async function(){
    //Try Catch the awaited promise to handel the error
    try{

    }
    catch(exception){
        //return an error message
        throw Error('error while welcoming users');
    }
}

exports.authenticateUser = function(user,secret, callback){

        User.findOne({username:user.username},
        (err,user)=>{
        if(err){
            console.log("Error");
            callback(err,{success:false,message:err});
        }
        if(!user){
        console.log('User not found!');
        //res.json({success:false,message:'Authentication failed.User not found.'});
        callback(null,{success:false,message:'no such user'});
    }
    else if(user){
        console.log('password verification');
        if(user.password!=user.password){
         //   res.json({success:false,message:"authentication failed.Wrong password"});
           callback(null,{success:false,message:"authentication failed.Wrong password"});
        }
        else
        {
            console.log('generating token');
            const payload ={
                admin:user.admin
            };
            console.log(payload.admin);
            var token =jwt.sign(payload,secret,{
                expiresIn:1440
            });
            console.log(token);
            // res.json({
            //     success:true,
            //     message:'Enjoy your token',
            //     toekn:token
            // })
            callback(null, {
                success:true,
                message:'Enjoy Your Token',
                token:token
            });
        }
    }
})}


