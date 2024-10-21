//all blog post routes will be defined here
const express=require('express');
const  {authenticate}  = require('../middlewares/Auth');
const router=express.Router();
 const {createBlogPost,getBlogPosts,getBlogPostById,updateBlogPost,deleteBlogPost}=require('../controllers/PostController');
// router.post('/create',createBlogPost);

router.post('/create',authenticate ,createBlogPost); // Authenticate user before allowing post creation
router.get('/posts',getBlogPosts);
 router.get('/post/:id',getBlogPostById);
 router.put('/update/:id',authenticate,updateBlogPost);
router.delete('/delete/:id',deleteBlogPost);

module.exports=router;

