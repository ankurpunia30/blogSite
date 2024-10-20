const express=require('express');
const connectDb=require('./config/db');

//creating express app
const app=express();

//connecting to db
connectDb();

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

