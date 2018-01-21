/**
 * Created by parientu on 1/17/2018.
 */

//getting the User model
var User = require('../models/users.model');
var jwt    = require('jsonwebtoken');

_this = this;



exports.usersWelcome = function(callback){
    //Try Catch the awaited promise to handel the error
    try{
            callback(null,{success:true,message:'welcome to users section'});
    }
    catch(exception){
        //return an error message
        throw Error({status:500,message:'error while welcoming users ' + exception.message});
    }
}

exports.authenticateUserupdated = async function(user,secret){
    try {
        var resultUser =  await User.findOne({username: user.username});

        if(!resultUser)
        {
            console.log("user not found");
            return {success:false,message:"user not found"};
        }
        else if(resultUser){

            if(user.password!=resultUser.password){
                return {success:false,message:"Wrong password"};
            }
            else
            {
                const payload ={
                    admin:resultUser.admin
                };
                var token =jwt.sign(payload,secret,{
                    expiresIn:1440
                });
                return {success:true,data:token,message:"enjoy your token"};
            }
        }
    }
    catch(exception){
       console.log("Wow" + exception.message);
    }
}

exports.authenticateUser = function(user,secret, callback){

    console.log('authenticateUser -service')
        User.findOne({username:user.username},
        (err,user)=>{
        if(err){
            console.log("Error");
            callback({message:"Error"},null);
        }
        if(!user){
        console.log('User not found!');
        //res.json({success:false,message:'Authentication failed.User not found.'});
        callback({success:false,message:'no such user'},null);
    }
    else if(user){
        console.log('password verification');
        if(user.password!=user.password){
         //   res.json({success:false,message:"authentication failed.Wrong password"});
           callback({success:false,message:"authentication failed.Wrong password"},null);
        }
        else
        {
            console.log('generating token');
            const payload ={
                admin:user.admin
            };

            var token =jwt.sign(payload,secret,{
                expiresIn:1440
            });

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

exports.tokenVerification = function(token,secret,callback)
{
    console.log('Starting to verify token...');
    if(token){
        jwt.verify(token,secret,function(err,decode) {
            if(err){
                console.log(err.message);
                callback(null,{success:false,message:'Failed to authenticate token. '});
               // return res.json({success:false,message:'Failed to authenticate token. '});
            }
            else{
                req.decoded = decode;
               // next();
                callback(req.decoded,null);
            }
        })
    }
    else{
        callback(null,{success:false,message:'No token provided'})
        //return res.status(403).send({success:false,message:'No token provided'});
    }
}


//refactoring authenticateuser
exports.authenticateUserRefact = async function(token,secret){
        if(token){
            try {
                var decoded = await jwt.verify(token, secret);
                return {results:'Success',data:decoded};
            }
            catch (exception)
            {
                console.log(exception.message);
                return {success:false,message:exception.message};
            }
        }
        else{
            return {success:false,message:'No Token Provided'};
        }
    }


//use this base skeleton for async/await usage
///this is working now
exports.myTestAsync = async function (user) {

    try {
        var results = await User.findOne({username:user.username});
        return results;
    }
    catch(exception)
    {
        return exception.message;
    }
}

exports.getUser = async  function(id){
    try
    {
        var user = await User.findOne({_id:id});
        if(user){
                return {success:true,data:user,message:'User Found'};
        }
    }
    catch(exception){
        return {success:false,data:{},message:'User no found'};
    }
}