const express=require('express');
const connectDb=require('./config/db');
//importing routes  
const userRoutes=require('./routes/userRoutes');

//creating express app
const app=express();

//connecting to db
connectDb();
//calling the routes
//using the routes
app.use(express.json());
app.use('/api/users',userRoutes);


//listening to the server
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

