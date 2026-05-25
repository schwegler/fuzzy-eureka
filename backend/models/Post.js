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
    required: false,
    maxlength: 2048,
    validate: {
      validator: function(v) {
        if (!v) return true; // url is optional for 'text' posts
        return /^https?:\/\//.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  tags: [{
    type: String
  }],
  comments: [{
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);
