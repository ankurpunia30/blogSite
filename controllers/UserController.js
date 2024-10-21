const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// user registration logic below
const userRegister = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        // Validate user input
        if (!(email && password && username)) {
            return res.status(400).json({ error: "All input is required" });
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(422).json({ error: "User already exists with this email" });
        }
        //logic for hashing the password
    const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
    }

        // Create new user without hashing password
        const newUser = new User({
            name: username,
            email: email,
            password: await hashPassword(password) // Store hashed password
        });
        // Save user and respond
      
        const newUserCreated = await newUser.save();

        // Generate token
        const token = jwt.sign({ user_id: newUserCreated._id, email }, process.env.TOKEN_KEY, { expiresIn: "2h" });
        newUserCreated.token = token;

        
        res.status(200).json(newUserCreated);

    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}





// user login logic below
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Validate user input
        if (!(email && password)) {
            return res.status(400).json({ error: "All input is required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });

        // Check for plain text password
        if (user ) { // Directly compare the passwords
            // Compare the password
            const validPassword = await bcrypt.compare(password, user.password);
            // Create token
            if (!validPassword) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, { expiresIn: "2h" });
            console.log(token);
            user.token = token;

            // Respond with user
            return res.status(200).json({ message: "Login successful", user });
        } else {
            return res.status(400).json({ error: "Invalid credentials" });
        }

    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}



// Exporting the controller functions
module.exports = { userLogin, userRegister };
