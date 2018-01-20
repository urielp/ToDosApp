/**
 * Created by parientu on 1/14/2018.
 */


var express = require('express');
var jwt    = require('jsonwebtoken');
var router = express.Router();
var todos  = require('./api/todos.route');
var users = require('./api/users.route');
var login =require('./api/login');


router.use('/login',login);

/*// route middleware to verify a token
router.use(function(req, res, next) {

     console.log('already inside middleware');
     // check header or url parameters or post parameters for token
     var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
     // decode token
     if (token) {
    
         // verifies secret and checks exp
         jwt.verify(token, express().get('superSecret'), function(err, decoded) {
         if (err) {
         return res.json({ success: false, message: 'Failed to authenticate token.' });
         } else {
         // if everything is good, save to request for use in other routes
         req.decoded = decoded;
         next();
         }
     });
    
     } 
     else {
     // if there is no token
     // return an error
     return res.status(403).send({
     success: false,
     message: 'No token provided.'
     });
    
     }
 });*/

router.use('/todos',todos);
router.use('/users',users);

module.exports = router;