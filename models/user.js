const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Define User schema with email, password, name, and date fields
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// // Hash password before saving user
// UserSchema.pre('save', function(next) {
//     const user = this;

//     // Generate salt and hash the password
//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) return next(err);
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if (err) return next(err);

//             user.password = hash;
//             next();
//         });
//     });
// });



// Create and export User model
const User = mongoose.model('user', UserSchema);
module.exports = User;
