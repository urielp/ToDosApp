/**
 * Created by parientu on 1/14/2018.
 */

var express = require('express');
var jwt    = require('jsonwebtoken');
var router =express.Router();
var config = require('../../config/config');
var ToDoController = require('../../controller/todos.controller');
var myAuthTest = require('../api/auth');

// function auth(req,res,next){
//    var token = req.headers['x-access-token']
//     if(token) {
//         jwt.verify(token,config.secret, function(err, decoded) {
//             if (err) {
//                 return res.json({ success: false, message: 'Failed to authenticate token.' });
//             } else {
//                 // if everything is good, save to request for use in other routes
//                 console.log('starting to decode token ');
//                 req.decoded = decoded;
//                 return next();
//             }
//
//     });
//    }
//     else
//         return res.status(403).json({status:200,data:{},message:'Idiot'});
// }

router.get('/',myAuthTest.auth,ToDoController.getToDos);

router.post('/',ToDoController.createTodo);

router.put('/',ToDoController.updateTodo);

router.delete('/:id',ToDoController.removeTodo);


module.exports = router;