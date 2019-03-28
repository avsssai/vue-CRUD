<template>
  <div class="main">
    <div class="container" id="todo-list">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <h1 class="text-center">TODO LIST</h1>
          <form v-on:submit="createTodo()">
            <input
              type="text"
              class="form-control"
              placeholder="Enter the task.."
              v-model="taskname"
            >
            <button class="btn-success btn-block mt-3" type="submit">Add Task</button>
            <!-- <button class='btn-primary btn-block mt-3' v-if="this.isEditing==true" @click="updateTask()">Update Task</button> -->
          </form>
          <table class="table">
            <tr v-for="todo in todos" v-bind:key="todo.id" v-bind:title="todo.title">
              <td class="text-left">
                <div
                  v-show="isEditing===false"
                  @dblclick="showEditingForm()"
                  v-on:blur="isEditing===false"
                >{{todo.title}}</div>
                <div v-show="isEditing===true">
                  <input type="text" v-bind:id="todo.id" v-model="todo.title" >
                </div>
              </td>
              <td class="text-right">
                <div v-if="isEditing===false">
                  <button @click="showEditingForm(todo)" class="btn btn-primary mr-3">Edit</button>
                  <button @click="deleteTodo(todo._id)" class="btn btn-secondary">Delete</button>
                </div>

                <div v-if="isEditing===true">
                  <button class="btn btn-primary" @click="updateTodo(todo)" @keydown.enter="updateTodo(todo)">Update</button>
                </div>
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
  data() {
    return {
      todos: [],
      taskname: "",
      isEditing: false
    };
  },
  mounted() {
    this.getTodos();
  },
  methods: {
    getTodos() {
      axios
        .get("http://localhost:4000/todos")
        .then(result => {
          this.todos = result.data;
        })
        .catch(err => {
          return err;
        });
    },
    createTodo() {
      axios
        .post("http://localhost:4000/todos/create", { title: this.taskname })
        .then(() => {
          if (this.taskname == "") {
            alert("You cannot leave the todo empty.");
            this.getTodos();
          }
          this.taskname = "";
          this.getTodos();
        })
        .catch(err => {
          return err;
        });
    },
    deleteTodo(id) {
      axios.delete(`http://localhost:4000/todos/${id}`).then(() => {
        this.getTodos();
        this.taskname = "";
      });
    },
    showEditingForm() {
      this.isEditing = true;
    },
    updateTodo(todo) {
      axios.put(`http://localhost:4000/todos/${todo._id}`,{title:todo.title}).then(() => {
        this.getTodos();
        this.isEditing = false;
      });
    }
  }
};
</script>
