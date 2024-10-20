const mongoose = require('mongoose');

const dbPath = 'mongodb://localhost:27017/blogSite';

const connectDb = async () => {
    try {
        await mongoose.connect(dbPath);
        console.log('Connected to the database');
    } catch (e) {
        console.log('Error connecting to the database');
        console.log(e);
    }
};

module.exports = connectDb;
