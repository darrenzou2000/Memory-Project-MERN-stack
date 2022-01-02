import mongoose  from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req,res) =>{
    try{
        console.log("ran")
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
    }catch(error){
        res.status(404).json({message:error.message})
    }
}

export const createPost = async (req,res)=> {
    const post = req.body;

    const newPost = new PostMessage(post);
    try{
        await newPost.save()
        res.status(201).json(newPost)
    }catch(e){
        res.status(409).json({message:error.message})  
    }
}

export const updatePost = async(req,res)=>{
    const { id:_id } = req.params;
    const post = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post,_id}, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req,res) =>{
    const {id:_id} = req.params;
    console.log("deleteing",_id)
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(_id)

    res.json({message: 'Post deleted successfully'})
}

export const likePost = async (req,res) => {
    const {id} = req.params;
    console.log("Liking post!")
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount:post.likeCount + 1}, {new :true});
    console.log("new like count:",updatedPost.likeCount)
    res.json(updatedPost)
}