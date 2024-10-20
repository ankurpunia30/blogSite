//two major parts needed to be done in this file
//1. create a new user
//2. login a user
//3. logout a user
//1. create a new user
// user registration logic
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// user registration logic below
const userRegister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // validate user input
        if (!(email && password && username)) {
            res.status(400).json({ error: "All input is required" });
        }
        // what if user already exists
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(422).json({ error: "User already exists with this email" });
        }
        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // create new user
        const newUser = new User({
            name: username,
            email: email,
            password: hashedPassword
        });
        // generate token
        const token = jwt.sign({ user_id: newUser._id, email }, process.env.TOKEN_KEY, { expiresIn: "2h" });
        newUser.token = token;
        
        // save user and respond
        const newUserCreated = await newUser.save();
        res.status(200).json(newUserCreated);

    }   
    catch (err) {
        res.status(500).json(err);
    }
}

// user login logic below
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // validate user input
        if (!(email && password)) {
            res.status(400).json({ error: "All input is required" });
        }
        // check if user exists
        const user = await User.findOne({ email: email });
        // check for hashed password
        if (user && (await bcrypt.compare(password, user.password))) {
            // create token
            const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, { expiresIn: "2h" });
            user.token = token;
            // respond with user
            res.status(200).json({ message: "Login successful" }, user);
        } else {
            res.status(400);
            throw new Error("Invalid credentials");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}

// Exporting the controller functions
module.exports={userLogin,userRegister};