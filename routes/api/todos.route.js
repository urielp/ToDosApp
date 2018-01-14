/**
 * Created by parientu on 1/14/2018.
 */

var express = require('express');

var router =express.Router();

var ToDoController = require('../../controller/todos.controller');



router.get('/',ToDoController.getToDos);

router.post('/',ToDoController.createTodo);

router.put('/',ToDoController.updateTodo);

router.delete('/:id',ToDoController.removeTodo);


module.exports = router;