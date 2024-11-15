import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  postId: mongoose.Types.ObjectId
  author: mongoose.Types.ObjectId;
  content: string;
  page: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema<IComment> = new Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  page: { type: Schema.Types.ObjectId, ref: 'Page', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

CommentSchema.pre<IComment>('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Comment = mongoose.model<IComment>('Comment', CommentSchema);
export default Comment;