/**
 * Created by parientu on 1/14/2018.
 */
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ToDoSchema =new mongoose.Schema({
    title:String,
    description:String,
    date:Date,
    status:String
});

ToDoSchema.plugin(mongoosePaginate);
const ToDo = mongoose.model('Todo',ToDoSchema);

module.exports = ToDo;