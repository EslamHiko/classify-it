const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  text: String,
  title:String,
  category: String,
  notes: String,
  assignees: String,
  link: String
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
