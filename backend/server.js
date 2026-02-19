const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Tweet = require('./models/Tweet');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/twitter-clone';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/api/tweets', async (req, res) => {
  try {
    const tweets = await Tweet.find().sort({ createdAt: -1 });
    res.json(tweets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tweets', async (req, res) => {
  try {
    const newTweet = new Tweet({
      content: req.body.content
    });
    const tweet = await newTweet.save();
    res.json(tweet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
