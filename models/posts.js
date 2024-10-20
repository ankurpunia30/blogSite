//defining the post schema for the database to store the posts
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title:{
        type: String,
        required: true,

    },
    content:{
        type: String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    },
});

PostSchema.pre('save', function(next){
    this.updated_at = Date.now();
    next();
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
