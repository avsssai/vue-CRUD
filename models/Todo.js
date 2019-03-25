const mongoose = require('mongoose');

const Todo = mongoose.Schema({
    name:{type:String}
},{
    timestamps:true
})

module.exports = mongoose.model('Todo',Todo);

