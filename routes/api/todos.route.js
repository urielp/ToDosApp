/**
 * Created by parientu on 1/14/2018.
 */

var express = require('express');

var router =express.Router();

var ToDoController = require('../../controller/todos.controller');

//CORS configuration
express().use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS,GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

router.get('/',ToDoController.getToDos);

router.post('/',ToDoController.createTodo);

router.put('/',ToDoController.updateTodo);

router.delete('/:id',ToDoController.removeTodo);


module.exports = router;