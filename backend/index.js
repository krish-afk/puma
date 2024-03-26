const express= require('express')
const app=express();
const course= require('./routes/classes')
const bodyParser=require('body-parser');

app.use(bodyParser.json());
app.use(course)

app.listen('8000',()=>{
    console.log("Backend is connected!")
})