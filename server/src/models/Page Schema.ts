import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User Schema';
import { IComment } from './Comment Schema';

interface Version {
  content: string;
  editor: IUser['_id'];
  date: Date;
}

export interface IPage extends Document {
  title: string;
  content: string;
  tags: string[];
  versions: Version[];
  views: number;
  comments: IComment['_id'][];
  createdAt: Date;
  updatedAt: Date;
}

const pageSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  versions: [{ 
    content: { type: String, required: true },
    editor: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    date: { type: Date, default: Date.now } 
  }],
  views: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

pageSchema.pre<IPage>('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<IPage>('Page', pageSchema);
