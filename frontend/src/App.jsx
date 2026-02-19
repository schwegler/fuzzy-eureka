import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tweets';

function App() {
  const [tweets, setTweets] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const response = await axios.get(API_URL);
      setTweets(response.data);
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      await axios.post(API_URL, { content });
      setContent('');
      fetchTweets();
    } catch (error) {
      console.error('Error posting tweet:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header>Home</header>
      <div className="tweet-form">
        <textarea
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={280}
          rows={3}
        />
        <button onClick={handleSubmit} disabled={!content.trim() || loading}>
          {loading ? 'Tweeting...' : 'Tweet'}
        </button>
      </div>
      <div className="feed">
        {tweets.map((tweet) => (
          <div key={tweet._id} className="tweet">
            <div className="tweet-content">{tweet.content}</div>
            <div className="tweet-date">{new Date(tweet.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
