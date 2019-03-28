const mongoose = require('mongoose');

const Todo = mongoose.Schema({
    title:{type:String}
},{
    timestamps:true
})

module.exports = mongoose.model('Todo',Todo);

