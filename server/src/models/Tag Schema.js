const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  pages: [{ type: Schema.Types.ObjectId, ref: 'Page' }]
});

const Tag = mongoose.model('Tag', TagSchema);
module.exports = Tag;


"Tags are simple strings and are embedded within the Page schema. However,"
" if you want to manage tags separately, you can create a Tag schema."
"Tags help categorize and search pages. Each tag should have a name and a count of how many pages use it."