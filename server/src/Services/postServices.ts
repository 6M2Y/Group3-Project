import { Request, Response } from 'express';
import Post from "../models/PageSchema";
//import { AuthenticatedRequest } from '../middlewares/verifyToken';
import User from '../models/User Schema';
import Comment from '../models/CommentSchema';

// Define the AuthenticatedRequest interface
interface AuthenticatedRequest extends Request {
  user: string; // or the appropriate type for your user
  file?: Express.Multer.File; // Use the correct type from multer
}

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

export const editPost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
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


  // Fetch all posts
export const getAllPosts = async (req: AuthenticatedRequest, res: Response) => {
  try {
      const posts = await Post.find();
      res.status(200).json(posts);
  } catch (error) {
     console.error("Error fetching posts:", error);
      res.status(500).json({ message: 'Error fetching posts' });
  }
}

// Fetch posts for a specific user
export const getUserPosts = async (req: AuthenticatedRequest, res: Response) => {
  try {
      const userId = req.user; // Assuming user ID is stored in req.user
      const posts = await Post.find({ author: userId });
      res.status(200).json(posts);
  } catch (error) {
     console.error("Error fetching user posts:", error);
      res.status(500).json({ message: 'Error fetching user posts' });
  }
}

// Add a new controller function to count posts for a specific user
export const countUserPosts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user; // Assuming user ID is stored in req.user
    const postCount = await Post.countDocuments({ author: userId });
    res.status(200).json({ postCount });
  } catch (error) {
    console.error("Error counting user posts:", error);
    res.status(500).json({ message: 'Error counting user posts' });
  }
}

//Add a new controller function to add a comment to a post
export const addComment = async (req: AuthenticatedRequest, res: Response) :
 Promise<void> => {
  const { postId, content } = req.body;
  const authorId = req.user;

  try {
    //get the post
    const post = await Post.findById(postId);
    if (!post) {
       res.status(404).json({ message: 'Post not found' });
       return;
    }

    // const newComment = new Comment({
    //   postId: new mongoose.Types.ObjectId(postId),
    //   author: new mongoose.Types.ObjectId(authorId),
    //   content
    // });
    // Create a new comment
    const newComment = new Comment({
      postId,
      content,
      author: authorId,
      page: postId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await newComment.save(); // create new comment in the database

     // Add comment to the post's comments array
     await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });
    // post.comments.push(newComment.id);
    // await post.save();

    res.status(200).json({ message: 'Comment added successfully', newComment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Failed to add comment', error });
  }
<<<<<<< HEAD
 }
=======
};
>>>>>>> 4fcf0dc5bbbacf3247de652090b154fae0d6201d
//get latest posts
export const getLatestPosts = (req: Request, res: Response) => { 
  Post.find({ published: true }) // Fetch published posts
    .populate("author", "fullname email -_id") // Include author details
    .sort({ "updatedAt": -1 }) // Sort by latest updated
    .select("title tags updatedAt -_id") // Select specific fields
    .limit(5) // Limit to 5 results
    .then(wikiPost => {
        return res.status(200).json({ wikiPost }); // Return results
    })
    .catch(err => {
        return res.status(500).json({ error: err.message }); // Handle errors
    });
<<<<<<< HEAD
}


// increment post views
export const incrementViews = async (req: AuthenticatedRequest, res: Response) => {
  const postId = req.params.id;
  try {
    await Post.findByIdAndUpdate(postId, { $inc: { views: 1 } });
    const post = await Post.findById(postId).populate('versions.editor', 'username');
    res.status(200).json(post);
  } catch (error) {
    console.error("Error incrementing views:", error);
    res.status(500).json({ message: "Failed to increment views.", error });
  }
}

// Save new version
export const saveNewVersion = async (req: AuthenticatedRequest, res: Response):
Promise<void> => {
  const postId = req.params.id;
  const { title, summary, content, tags, image } = req.body;
  const editorId = req.user;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found." });
      return;
    }
    //console.log("Original Post:", post);

    const newVersion = {
      title: title || post.title,
      summary: summary || post.summary,
      content: content || post.content,
      tags: tags || post.tags,
      image: image || post.image,
      published: post.published,
      editor: new mongoose.Types.ObjectId(editorId), // Convert editorId to ObjectId
      date: new Date()
    };

    post.versions.push(newVersion);
    post.title = title || post.title;
    post.summary = summary || post.summary;
    post.content = content || post.content;
    post.tags = tags || post.tags;
    post.image = image || post.image;

    //console.log("Updated Post:", post);

    await post.save();

// Populate the editor field in the versions array
const populatedPost = await Post.findById(post._id).populate('versions.editor', 'username');

    res.status(200).json({ message: "Version saved successfully.", post });
  } catch (error) {
    console.error("Error saving version:", error);
    res.status(500).json({ message: "Failed to save version.", error });
  }
}

// Get page statistics
export const getPageStatistics = async (req: AuthenticatedRequest, res: Response):
Promise<void> => { 
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId).populate('versions.editor', 'username');
    if (!post) {
      res.status(404).json({ message: "Post not found." });
      return;
    }
    const statistics = {
      views: post.views,
      versions: post.versions
    };
    res.status(200).json(statistics);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ message: "Failed to fetch statistics.", error });
  }
}

// Function to delete a post
export const deletePost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const postId = req.params.id;
  const userId = req.user;

  try {
    // Find the post by its ID
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found." });
      return;
    }

    // Check if the user is the author of the post
    if (post.author.toString() !== userId) {
      res.status(403).json({ message: "You are not authorized to delete this post." });
      return;
    }
    // Delete the post
    await Post.findByIdAndDelete(postId);
    // Remove the post ID from the user's posts array
    await User.findByIdAndUpdate(userId, { $pull: { posts: postId } });
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Failed to delete post.", error });
  }
};
=======
};

export const searchPostsByTag = (req: Request, res: Response) => {
  const {tag} = req.body;
  const  findQuery = { tags: tag, published: true }

  Post.find(findQuery) // Fetch published posts
    .populate("author", "fullname email -_id") // Include author details
    .sort({ "updatedAt": -1 }) // Sort by latest updated
    .select("title tags content summary updatedAt") // Select specific fields
    .limit(5) // Limit to 5 results
    .then(wikiPost => {
        return res.status(200).json({ wikiPost }); // Return results
    })
    .catch(err => {
        return res.status(500).json({ error: err.message }); // Handle errors
    });
};

export const getTagCounts = async (req: Request, res: Response)=> {
  try {
    const tagCounts = await Post.aggregate([
      { $unwind: "$tags" }, 
      { $group: { _id: "$tags", count: { $sum: 1 } } }, 
      { $project: { tag: "$_id", count: 1, _id: 0 } }, 
    ]);
   res.json(tagCounts);
  } catch (error) {
    console.error(error);
     res.status(500).json({ error: "Error fetching tag counts" });
  }
};

// Increment views for a page
export const getViews = async (req: Request, res: Response):Promise<void> => {
  try {
    const page = await Post.findById(req.params.id);
    if (!page) {
      res.status(404).json({ message: 'Page not found' }); return;
    }

    // Increment view count
    page.views += 1;
    await page.save();

    res.status(200).json({ message: 'Page views incremented', views: page.views });
  } catch (error) {
    res.status(500).json({ error: 'Failed to increment views' + error });
  }
};

export const getComments = async (req:Request, res:Response):Promise<void> => {
  const { postId } = req.params;

  try {
    // Find the post and populate comments
    const post = await Post.findById(postId)
      .populate({
        path: 'comments',
        select: 'content createdAt updatedAt',
      });

    if (!post) {
      res.status(404).json({ message: 'Post not found' }); return;
    }

    res.json(post.comments);
  } catch (error) {
    console.error('Error fetching post with comments:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
>>>>>>> 4fcf0dc5bbbacf3247de652090b154fae0d6201d
