const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

router.route('/create').post((req,res)=>{
    const todo = new Todo(req.body);
    todo.save()
        .then(task=>{
            res.status(200).json({'msg':'Todo saved successfully!'});
        })
        .catch(err=>{
            res.status(400).send('Error in saving Todo.');
        })


})
//get all todos.
router.route('/').get((req,res)=>{
    Todo.find((err,todos)=>{
        if(err){
            res.send('error in fetching todos.')
        }else{
            res.json(todos);
        }
    })
})
//update a todo.
router.route('/todos/:id').put((req,res)=>{
    req.findById(req.params.id,(err,todo)=>{
        if(!todo){
            res.send('Error fetching the todo.');
        }else{
            todo.name = req.body.name;
            todo.save()
            .then(todo=>{
                res.json({'msg':'Todo updated successfully.'});
            })
            .catch(err=>{
                res.send('the error in updating the task is ' + err);
            })
    

        }
    })
})
//find a todo by id.
router.route('/todos/:id').get((req,res)=>{
    req.findById(req.params.id,(err,todo)=>{
        if(!todo){
            res.send('Could not fetch the todo by id.');
        }else{
            res.json(todo)
        };
    })
})

//delete todo

router.route('/todos/:id').delete((req,res)=>{
    router.findById(req.params.id,(err,todo)=>{
        if(!todo){
            res.send('Todo not found.');
        }else{
            res.findByIdAndRemove({_id:req.id})
                .then(todo=>{
                    res.json('Todo deleted.');
                })
                .catch(err=>{
                    res.send('error in deleting todo.');
                })
        }
    })
})

module.exports = router;