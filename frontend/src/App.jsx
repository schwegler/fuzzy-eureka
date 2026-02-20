import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/posts';

function PostForm({ onPostCreated }) {
  const [type, setType] = useState('text');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === 'text' && !content.trim()) return;
    if (type !== 'text' && !url.trim()) return;

    setLoading(true);
    try {
      const tagList = tags.split(',').map(t => t.trim()).filter(t => t);
      await axios.post(API_URL, { type, content, url, tags: tagList });
      setContent('');
      setUrl('');
      setTags('');
      setType('text');
      onPostCreated();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form">
      <div className="type-selector">
        {['text', 'photo', 'gif', 'link'].map(t => (
          <button
            key={t}
            className={type === t ? 'active' : ''}
            onClick={() => setType(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {type !== 'text' && (
        <input
          type="text"
          placeholder={`${type === 'link' ? 'Link' : 'Image/GIF'} URL`}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="url-input"
        />
      )}

      <textarea
        placeholder={type === 'text' ? "What's happening?" : "Add a caption..."}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="tags-input"
      />

      <button onClick={handleSubmit} disabled={loading || (type === 'text' && !content) || (type !== 'text' && !url)}>
        {loading ? 'Posting...' : 'Post'}
      </button>
    </div>
  );
}

function CommentSection({ postId, comments, onCommentAdded }) {
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      await axios.post(`${API_URL}/${postId}/comments`, { content: newComment });
      setNewComment('');
      onCommentAdded();
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comments-section">
      <h4>Comments</h4>
      <div className="comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <p>{comment.content}</p>
            <small>{new Date(comment.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <div className="comment-form">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleComment} disabled={loading || !newComment.trim()}>
          Reply
        </button>
      </div>
    </div>
  );
}

function PostItem({ post, onUpdate }) {
  return (
    <div className={`post post-${post.type}`}>
      <div className="post-header">
        <span className="post-type-badge">{post.type}</span>
        <span className="post-date">{new Date(post.createdAt).toLocaleString()}</span>
      </div>

      <div className="post-content">
        {post.type === 'text' && <p>{post.content}</p>}
        {(post.type === 'photo' || post.type === 'gif') && (
          <div className="media-content">
            <img src={post.url} alt="Post content" />
            {post.content && <p className="caption">{post.content}</p>}
          </div>
        )}
        {post.type === 'link' && (
          <div className="link-content">
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="link-preview">
              {post.url}
            </a>
            {post.content && <p className="caption">{post.content}</p>}
          </div>
        )}
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map((tag, i) => (
            <span key={i} className="tag">#{tag}</span>
          ))}
        </div>
      )}

      <CommentSection
        postId={post._id}
        comments={post.comments}
        onCommentAdded={onUpdate}
      />
    </div>
  );
}

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
