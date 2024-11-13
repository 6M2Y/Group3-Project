// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const CommentSchema = new Schema({
//   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   text: { type: String, required: true },
//   page: { type: Schema.Types.ObjectId, ref: 'Page', required: true },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// CommentSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// const Comment = mongoose.model('Comment', CommentSchema);
// module.exports = Comment;

// // "Comments are associated with pages, contain content, and have an author (user ID)."
// // "Allow comments to be edited or deleted by storing a last updated timestamp"
import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the interface for the Comment schema
interface IComment extends Document {
  user: Types.ObjectId;
  text: string;
  page: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Comment schema
const CommentSchema: Schema<IComment> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    page: { type: Schema.Types.ObjectId, ref: 'Page', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

// Pre-save hook to update the `updatedAt` field
CommentSchema.pre<IComment>('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create the model
const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;
