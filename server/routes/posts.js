import express from "express";
import {getPosts,createPost,updatePost,deletePost,likePost} from "../controllers/posts.js"
const router = express.Router();

// This links the route to a function defined in ../controllers to make the routes really clean 
//and the hanlding somewhere else
router.get('/', getPosts)
router.post('/',createPost)
//patch is used for updaing existing documents
router.patch("/:id", updatePost)
router.delete("/:id", deletePost)
router.patch("/:id/likePost",likePost)
export default router;
