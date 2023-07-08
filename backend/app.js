const dbConnect=require('./db')

const URI="mongodb+srv://madhavdua26:QysDook9QVf0BL1K@cluster0.nabpasu.mongodb.net/?retryWrites=true&w=majority"
dbConnect(URI);
// dbConnect("mongodb://localhost:27017/Task_Manager_Db")

const express=require('express');
require("dotenv").config();
const port=process.env.PORT||80;
const app=express();

// to avoid cors error
let cors = require('cors')
app.use(cors());

// to avoid req. body is undefined i use below 2 statements
app.use(express.json());
app.use(express.urlencoded());


app.get('/',(req,res)=>{
    res.send('i am home page')
})

app.use('/api/auth',require('./Routes/user'));
app.use('/api/task',require('./Routes/task'));
app.use('/api/admin',require('./Routes/admin'));

app.listen(port,()=>{
    console.log('app started successfully')
})