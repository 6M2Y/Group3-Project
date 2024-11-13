import User from '../models/User Schema';
import Page from '../models/Page Schema';
import Comment from '../models/Comment Schema';
import Tag from '../models/Tag Schema';

interface ProfileData {
  user: any; // Replace 'any' with the appropriate type
  pages: any[]; // Replace 'any' with the appropriate type
  comments: any[]; // Replace 'any' with the appropriate type
  tags: string[];
}

export const getProfileData = async (userId: string): Promise<ProfileData | null> => {
  const user = await User.findById(userId);
  if (!user) {
    return null; // Handle the case where the user is not found
  }
  const pages = await Page.find({ author: user._id });
  const comments = await Comment.find({ author: user._id });
  const tags = await Tag.find({ pages: { $in: pages.map(page => page._id) } }).distinct('name');

  return { user, pages, comments, tags };
};
