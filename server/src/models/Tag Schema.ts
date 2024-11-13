import mongoose, { Document, Schema } from 'mongoose';
import { IPage } from './Page Schema';

export interface ITag extends Document {
  name: string;
  pages: IPage['_id'][];
}

const tagSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  pages: [{ type: Schema.Types.ObjectId, ref: 'Page' }]
});

export default mongoose.model<ITag>('Tag', tagSchema);
