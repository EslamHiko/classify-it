const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  text: String,
  category: String,
}, { timestamps: true });

const List = mongoose.model('List', postSchema);

module.exports = List;
