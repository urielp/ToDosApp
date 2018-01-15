/**
 * Created by parientu on 1/14/2018.
 */


var TodoService = require ('../services/todo.service');

_this=this;


exports.getToDos = async function getToDos(req,res,next){

    var page = req.query.page ? req.query.page:1;
    var limit = req.query.limit ? req.query.limit : 10;

    try {

        var todos = await TodoService.getTodos({},page,limit);
        return res.status(200).json({status:200,data:todos,message:'Successfully Todos Received'});
    }

    catch(exception){
        return res.status(400).json({status:400,message:exception.message});
    }
}

exports.createTodo = async function(req,res,next){

    var todo={
        title:req.body.title,
        description:req.body.description,
        status:req.body.status
    }

    try{
        var createTodo = await TodoService.createTodo(todo);
        return res.status(200).json({status:200,data:createTodo,message:'Todo created successfully'})
    }

    catch(exception){
        return res.status(400).json({status:400,message:exception.message})

    }
}

exports.updateTodo = async function(req,res,next){
    if(!req.body._id){
        return res.status(400).json({status:400,message:'Id must be presented'});
    }

    var id = req.body._id;

    console.log(req.body);

    var todo ={
        id,
        title:req.body.title?req.body.title:null,
        description:req.body.description?req.body.description:null,
        status: req.body.status ? req.body.status : null
    }

    try{
        var updatedTodo = await TodoService.updateToDo(todo);
        return res.status(200).json({status: 200, data: updatedTodo, message: "Succesfully Updated Tod"})
    }
    catch(exception){
        return res.status(400).json({status: 400., message: exception.message})
    }
}

exports.removeTodo = async function(req,res,next){
    var id =req.params.id;
    console.log("Removing todo with ID(controller): " + id);

    try{
        var deleted = await TodoService.deleteTodo(id);
        return res.status(204).json({status:204, message: "Succesfully Todo Deleted"});
    }
    catch (exception){

        return res.status(400).json({status: 400, message: exception.message});
    }
}

