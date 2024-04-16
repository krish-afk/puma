const express= require('express')
const app=express();
const course= require('./routes/classes')
const bodyParser=require('body-parser');
const pdfUploadRouter = require('./pdfUploadController'); 




app.use((req,res,next)=>{
    res.setHeader('Access-control-allow-Origin','*')
    res.setHeader('Access-control-allow-Methods','GET, POST , PUT,DELETE')
    res.setHeader('Access-control-allow-Headers','Content-Type, Authorization')
    next();
});

app.use(express.json());
app.use(course)
app.use('/upload', pdfUploadRouter);

app.listen('8000',()=>{
    console.log("Backend is connected!")
})
