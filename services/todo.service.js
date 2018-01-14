/**
 * Created by parientu on 1/14/2018.
 */

//getting the ToDo model
var ToDo = require('../models/todo.model');

_this = this;

//async function to get the todo list
//with pagnitation

exports.getTodos = async function(query,page,limit){

    //setting options for the mongoose paginate
    var options ={
        page,
        limit
    }

    //Try Catch the awaited promise to handel the error
    try{

        var todos = await ToDo.paginate(query,options);
        return todos;
    }

    catch(exception){
        //return an error message
        throw Error('error while paginating Todos');
    }

}

exports.createTodo = async function(todo) {

    var newTodo =new ToDo({
        title:todo.title,
        description:todo.description,
        date:new Date(),
        status:todo.status
    });

    try {
        var savedTodo = await newTodo.save();
        return savedTodo;
    }
    catch (exception){
        throw Error('Error while Creating Todo:' +exception.message);
    }
}

exports.updateToDo =async function(todo){

    var id =todo.id;

    try{
        var oldTodo = await ToDo.findById(id);

    }

    catch(exception){
        throw Error('Error occured while trying to find the todo');
    }

    if(!oldTodo) {

        return false;
    }
    console.log(oldTodo);

    oldTodo.title = todo.title;
    oldTodo.description =todo.description;
    oldTodo.status =todo.status;

    console.log(oldTodo);

    try{
        var saveToDo = await oldTodo.save();
        return saveToDo;
    }
    catch(exception){
        throw Error('An error occured while trying to update the todo')
    }
}

exports.deleteTodo = async function(id){

    try{
        var deleted = await ToDo.remove({_id:id});
        if(deleted.results.n==0){
            throw Error("Todo could not be deleted");
        }
        return deleted;
    }
    catch(exception){
        throw Error("Error occured while trying to delete todo")
    }

}


