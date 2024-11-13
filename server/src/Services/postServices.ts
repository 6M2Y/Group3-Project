import { Request, Response } from 'express';
import Post from "../models/PageSchema";

export const saveDraftPost =  async (req: Request, res: Response) => {
    const { title, summary, content, tags } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;
  
    try {
      const draft = new Post({
        title,
        summary,
        content,
        tags: JSON.parse(tags),
        image,
        published: false,
      });
  
      await draft.save();
      res.status(200).json({ message: "Draft saved successfully.", post: draft });
    } catch (error) {
      console.error("Error saving draft:", error);
      res.status(500).json({ message: "Failed to save draft.", error });
    }
  };
  
  // Route to publish a post
export const publishPost = async (req: Request, res: Response) => {
  console.log(req.body)
    const { title, summary, content, tags } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;
  
    try {
      const newPost = new Post({
        title,
        summary,
        content,
        tags: JSON.parse(tags),
        image,
        published: true,
      });
  
      await newPost.save();
      res.status(200).json({ message: "Post published successfully.", post: newPost });
    } catch (error) {
      console.error("Error publishing post:", error);
      res.status(500).json({ message: "Failed to publish post.", error });
    }
  };

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