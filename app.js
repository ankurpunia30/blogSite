require('dotenv').config();
const express=require('express');
const connectDb=require('./config/db');
//importing routes  
const userRoutes=require('./routes/userRoutes');
const blogRoutes=require('./routes/BlogRoutes');
//creating express app
const app=express();

//connecting to db
connectDb();
//calling the routes
//using the routes
app.use(express.json());
app.use('/api/user',userRoutes);
//using blog routes
app.use('/api/blog',blogRoutes);

// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});


//listening to the server
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

