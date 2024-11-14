import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  user: mongoose.Types.ObjectId;
  text: string;
  page: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema<IComment> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
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