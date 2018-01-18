/**
 * Created by parientu on 1/17/2018.
 */


var UserService = require ('../services/users.service');

_this=this;


exports.usersWelcome = function welcomeUser(req,res,next){//async function welcomeUser(req,res,next){
  //  try {
        console.log("welcome users(controller)");
        //var usesrs = await UserService.usersWelcome();
        UserService.usersWelcome((err,response)=>{
            if(!err) {
                return res.status(200).json({success: false, message: response.message});
            }
            else
                return res.status(500).json({success: false, message: response.message});
        })
   // }

    // catch(exception){
    //     console.log("Oh no" )
    //     return res.status(400).json(exception.message);
    // }
}


exports.authenticateUser = async function authenticateUser(req,res,next)
{
    var user = {
        username:req.body.username,
        password:req.body.password

    };
        console.log('auth users - controller');
        UserService.authenticateUser(user,req.app.get('superSecret'),(err, response)=>{
            if(!err) {
                console.log("Response --> " + response);
                return res.status(200).json({status: 200, data: response.token, message:response.message});
            }
            else
            {
                return res.status(500).json({status: 500, message: err.message})
            }
        });
    // }
    // catch(exception){
    //     return res.status(400).json({status:400,message:exception.message})
    // }
}

exports.tokenVerification = function (token,secret)
{
UserService.tokenVerification(token,secret,(response,err)=>{

    if(!err){
       //return res.status(200).json(response);
        console.log(response);
        return response;
    }
    else
    {
        console.log(err);
        return err;
      //  return res.status(500).json(err);
    }
})
}


exports.tokenVerificationRefact = async function(req,res,token){

    try {
        console.log("tokenVerificationRefact");
        var results = await UserService.authenticateUserRefact(token,req.app.get('superSecret'));

        if (results.results==='Success' && results.data )
            return res.status(200).json({status:200,data:results.data,message:"great"});
        else {

            return res.status(500).json({status: 500, message: "Token Error"});
        }
    }
    catch (exception){
        console.log(88888);
        return  res.status(500).json({status:500,message:exception.message});
    }
}

exports.myTestAsync =async function(req,res)
{
    try{
        var user = {
            username:req.body.username,
            password:req.body.password
        }

        var userResult = await UserService.myTestAsync(user);
        if(userResult)
            return res.status(200).json({status:200,data:userResult,message:"great"});
        else
            return res.status(500).json({status:500,message:"User not found"});
    }
    catch(exception){
        return  res.status(500).json({status:500,data:{},message:exception.message});
    }

}





