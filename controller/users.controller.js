/**
 * Created by parientu on 1/17/2018.
 */


var UserService = require ('../services/users.service');

_this=this;


exports.usersWelcome = async function welcomeUser(req,res,next){
    try {
        console.log("welcome users(controller)");
        //var usesrs = await UserService.usersWelcome();
        return res.status(200).json({status:200,message:'Welcome to users'});
    }

    catch(exception){
        return res.status(400).json({status:400,message:exception.message});
    }
}


exports.authenticateUser = async function authenticateUser(req,res,next)
{
    var user = {
        username:req.body.username,
        password:req.body.password

    };
    console.log(user.username + " --> " + user.password);
    try {
        console.log('auth users - controller');
        var response = await UserService.authenticateUser(user,req.app.get('superSecret'));
        console.log("Response --> " +response);
        return  res.status(200).json({status: 200, data:response.token,message: "some message"});


    }

    catch(exception){
        return res.status(400).json({status:400,message:exception.message})
    }
}