import express from 'express';
import listrouter from './router/listrouter.js'
import mongoose from 'mongoose';
import cors from 'cors';
const app=express();

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/todolist",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{console.log("mongodb conected");
})
.catch((err)=>{
    console.err(err);
    
})
app.use("/api/v1",listrouter);
app.listen(3000,"0.0.0.0",(req,res)=>{
    console.log("server is running");
})