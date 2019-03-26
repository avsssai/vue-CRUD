<template>

<div class="main">
  <div class="container" id='todo-list'>
    <div class="row">
      <div class="col-md-6 mx-auto">
          <h1 class='text-center'>TODO LIST</h1>
          <form v-on:submit='createTodo()'>
            <input type="text" class='form-control' placeholder='Enter the task..' v-model='taskname'>
            <button class='btn-success btn-block mt-3' type='submit'>Add Task</button>
        </form>
        <table class='table'>
          
          <tr v-for='todo in todos' v-bind:key='todo.id' v-bind:title='todo.title'>
            <td class='text-left'>{{todo.title}}</td>
            <td class='text-right'>
              <button @click='editTodo(todo._id,todo.title)' class="btn btn-primary mr-3">
                  Edit
              </button>
              <button @click='deleteTodo(todo._id)' class="btn btn-secondary">
                  Delete
              </button>
            </td>
            
          </tr>
          
        </table>
        
      </div>
    </div>
    
  </div>
</div>
</template>



<script>
import axios from "axios";

export default {
    data(){
        return{
            todos:[],
            taskname:''
        }
    },
    mounted(){
        this.getTodos();
    },
    methods:{
        getTodos(){
            axios.get('http://localhost:4000/todos')
            .then(result=>{
                this.todos = result.data;
            })
            .catch(err=>{
                return (err);
            })
        },
        createTodo(){
            axios.post('http://localhost:4000/todos/create',{title:this.taskname})
                .then(()=>{
                    this.taskname ='';
                    this.getTodos();
                })
                .catch(err=>{
                return (err);
                });
        },
        deleteTodo(id){
            axios.delete(`http://localhost:4000/todos/${id}`)
            .then(()=>{
                this.getTodos();
                this.taskname='';
            })
        }
    }
}
</script>
