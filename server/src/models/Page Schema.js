const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  versions: [{ 
    content: String,
    editor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    date: { type: Date, default: Date.now } 
  }],
  views: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

PageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Page = mongoose.model('Page', PageSchema);
module.exports = Page;

"Each page represents a wiki page with a title, content, associated tags, and an author (user ID)."
"Pages will reference versions to track changes."
"You may also include statistics such as the view count."
"Version Schema"
"Since versions are embedded within the Page schema, you don’t need a separate schema for versions. They are already included in the versions array in the Page schema."