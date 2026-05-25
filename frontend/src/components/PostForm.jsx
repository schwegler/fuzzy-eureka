import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';

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

export default PostForm;
