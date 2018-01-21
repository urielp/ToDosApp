/**
 * Created by parientu on 1/21/2018.
 */
var jwt    = require('jsonwebtoken');
var config = require('../../config/config');


exports.auth =function(req,res,next){
    var token = req.headers['x-access-token'] || req.query || req.body ;

    if(token) {
        jwt.verify(token,config.secret, function(err, decoded) {
            if (err) {
                return res.json({ success: false,data:{},message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                console.log('starting to decode token ');
                req.decoded = decoded;

                return next();
            }

        });
    }
    else
        return res.status(403).json({status:200,data:{},message:'Idiot'});
}

