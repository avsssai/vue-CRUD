const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
let app = express();
const Todo = require('./models/Todo');
const todos = require('./routes/todos');

const router = express.Router();
mongoose.connect('mongodb://localhost:27017/vueCRUD',{useNewUrlParser:true})
    .then(()=>{
        console.log('connected to the database.');
    },(err)=>{
        console.log(`The error in connection to the database is  ${err}`);
    });


app.use(bodyParser.json());   
app.use(express.static('public')); 
app.use(cors());

app.use('/todos',todos);

const PORT = process.env.PORT || 4000;



app.listen(PORT,()=>{
    console.log('Listening on Port  '+PORT);
});
