//all the blog post controllers will be defined here
const Blog=require('../models/posts');
const express=require('express');


//creating a new blog post
const createBlogPost=async(req,res)=>{
    try{
        const {title,content}=req.body;
        if(!(title && content)){
            return res.status(400).json({error:"All input is required"});
        }
        
        const newBlogPost=new Blog({
            title,
            content,
            author:req.user
        });
        

        const savedBlogPost=await newBlogPost.save();
      
        res.status(200).json(savedBlogPost);

    }
    catch(err){
        console.error(err);
        res.status(500).json({error:"Internal server error"});
    }

}
//getting all blog posts
const getBlogPosts=async(req,res)=>{
    try{
        const blogPosts=await Blog.find();
        res.status(200).json(blogPosts);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:"Internal server error"});
    }

}
//getting a single blog post by id
const getBlogPostById=async(req,res)=>{
    const id=req.params.id;
    console.log(id);
    try{
        //find the blog post by id
        const blogPost=await Blog.findById(id);
        console.log(blogPost);
        if(blogPost){
            res.status(200).json(blogPost);
        }
        else{
            res.status(404).json({error:"Blog post not found"});
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:"Internal server error"});
    }
}
//updating a blog post by id
const updateBlogPost=async(req,res)=>{
    const id=req.params.id;
    try{
        // console.log(id);
        const {title,content}=req.body;
        if(!(title && content)){
            return res.status(400).json({error:"All input is required"});
        }
        const updatedBlogPost=await Blog.findByIdAndUpdate(id,{
            title,
            content
        },{new:true});
        res.status(200).json(updatedBlogPost);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:"Internal server error"});
    }

}
//deleting a blog post by id
const deleteBlogPost=async(req,res)=>{
    const id=req.params.id;
    try{
        const deleteBlogPost=await Blog.findByIdAndDelete(id);
        
        res.status(200).json({message:"Blog post deleted successfully"});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:"Internal server error"});
    }
}
module.exports={createBlogPost,getBlogPosts,getBlogPostById,updateBlogPost,deleteBlogPost};

