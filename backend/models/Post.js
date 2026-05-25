const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'photo', 'gif', 'link'],
    required: true
  },
  content: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: false
  },
  tags: [{
    type: String
  }],
  comments: [{
    content: String,
    createdAt: {
      type: Date,
      default: Date.now,
      index: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

module.exports = mongoose.model('Post', PostSchema);
