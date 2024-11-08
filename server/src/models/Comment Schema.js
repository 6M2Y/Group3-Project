const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  page: { type: Schema.Types.ObjectId, ref: 'Page', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

CommentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;

"Comments are associated with pages, contain content, and have an author (user ID)."
"Allow comments to be edited or deleted by storing a last updated timestamp"