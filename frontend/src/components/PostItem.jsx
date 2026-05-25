import CommentSection from './CommentSection';

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

export default PostItem;
