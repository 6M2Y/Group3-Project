import { Request, Response } from 'express';

import Post from "../models/PageSchema";
import { AuthenticatedRequest } from '../middlewares/verifyToken';
import User from '../models/User Schema';

export const saveDraftPost =  (req: AuthenticatedRequest, res: Response) => {
  const { title, summary = "", content = "", tags = "[]" } = req.body;
  const authorId = req.user; //the token passed and verified by the jwt
  //  console.log(" req:" + req.body)  
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;
  
  if (!title.length) { res.status(403).json({ error: "You must providee tilte to publish" }); }
  try {
    console.log("image" + image)
    const draftPost = new Post({
      author: authorId,
      title,
      summary,
      content,
      tags: JSON.parse(tags),
      image,
      published: false,
    });
  
    draftPost.save().then((post) => {
      
      //find and update the user
      User.findOneAndUpdate({ _id: authorId }, { $push: { "posts": post._id } }).then(() => {
        return res.status(200).json({ message: "Draft saved successfully.", post: draftPost });
      });
    }).catch(error => {
      console.error("Error drafting:", error);
      res.status(500).json({ message: "Failed to save the draft.", error });
      return;
    });
  } catch (error) {
    res.status(500).json({ message: "Error drafting the post.", error });
    return
  }
  };
  
  // Route to publish a post
export const publishPost = (req: AuthenticatedRequest, res: Response)=> {
  
  const { title, summary, content, tags } = req.body;
  const authorId = req.user; //the token passed and verified by the jwt
  // console.log(" req:" + req.body)  
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;
  
  if (!title.length) { res.status(403).json({ error: "You must providee tilte to publish" }); }
  if (!summary.length) { res.status(403).json({ error: "You must providee summary to publish" }); }
  if (!tags.length) { res.status(403).json({ error: "You must select a tag for your post" }); }
  if (!content.length) { res.status(403).json({ error: "You must provide content for your post" }); }
  
  try {
    const newPost = new Post({
      author: authorId,
      title,
      summary,
      content,
      tags: JSON.parse(tags),
      image,
      published: true,
    });
  
    newPost.save().then((post) => {
      //find and update the user total nr of posts
      User.findOneAndUpdate({ _id: authorId }, { $inc: { "account_info.total_posts": 1 }, $push: { "posts": post._id } }).then(() => {
        return res.status(200).json({ message: "Post published successfully.", post: newPost });
      });
    }).catch(error => {
      console.error("Error publishing post:", error);
      res.status(500).json({ message: "Failed to publish post.", error });
      return;
    });
  } catch (error) {
    console.error("Error updating post:", error);
     res.status(500).json({ message: "Error creating the post.", error });return
  }
}

export const editPost = async (req: Request, res: Response): Promise<void> => {
    const postId = req.params.id;
    const { title, content, tags, image } = req.body;
    
    try {
      // Find the post by its ID
      const post = await Post.findById(postId);
      if (!post) {
         res.status(404).json({ message: "Post not found." });return
      }
  
      // Add the new version to the versions array with updated fields
    //   const newVersion = {
    //     title: title || post.title, // If no title is provided, keep the current one
    //     content: content || post.content,
    //     tags: tags || post.tags,
    //     image: image || post.image, // If no image is provided, keep the current one
    //     editor: req.user._id, // Assuming you have the user data in `req.user`
    //     date: new Date(),
    //   };
  
      // Push the new version into the versions array
    //   post.versions.push(newVersion);
  
      // Update the post with the new content and version
      post.title = title || post.title;
      post.content = content || post.content;
      post.tags = tags || post.tags;
      post.image = image || post.image;
  
      // Save the updated post
      await post.save();
  
      res.status(200).json({ message: "Post updated successfully.", post });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Failed to update post.", error });
    }
  }