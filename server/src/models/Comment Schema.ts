import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User Schema';
import { IPage } from './Page Schema';

export interface IComment extends Document {
  user: IUser['_id'];
  text: string;
  page: IPage['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  page: { type: Schema.Types.ObjectId, ref: 'Page', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

commentSchema.pre<IComment>('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<IComment>('Comment', commentSchema);
