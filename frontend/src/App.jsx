import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { API_URL } from './constants';
import PostForm from './components/PostForm';
import PostItem from './components/PostItem';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(API_URL);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className="App">
      <header>Tumblog</header>
      <PostForm onPostCreated={fetchPosts} />
      <div className="feed">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} onUpdate={fetchPosts} />
        ))}
      </div>
    </div>
  );
}

export default App;
