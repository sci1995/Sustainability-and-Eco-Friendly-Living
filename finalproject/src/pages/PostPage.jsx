import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import { FaThumbsUp, FaEdit, FaTrashAlt } from 'react-icons/fa';
import Button from '../components/Button';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const { data: postData, error: postError } = await supabase
          .from('Posts')
          .select('*')
          .eq('id', id)
          .single();

        if (postError) throw postError;

        setPost(postData);

        const { data: commentsData, error: commentsError } = await supabase
          .from('Comments')
          .select('*')
          .eq('postId', id);

        if (commentsError) throw commentsError;

        setComments(commentsData);
      } catch (err) {
        setError('Error fetching post details: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleUpvote = async () => {
    try {
      const updatedPost = { ...post, upVotes: post.upVotes + 1 };
      await supabase
        .from('Posts')
        .update({ upVotes: updatedPost.upVotes })
        .eq('id', post.id);

      setPost(updatedPost);
    } catch (err) {
      setError('Error upvoting post: ' + err.message);
    }
  };

  const handleDeletePost = async () => {
    try {
      await supabase.from('Posts').delete().eq('id', post.id);
      navigate('/');
    } catch (err) {
      setError('Error deleting post: ' + err.message);
    }
  };

  const handleAddComment = async () => {
    if (!newComment) return;
  
    try {
      const { data, error } = await supabase
        .from('Comments')
        .insert([{ postId: post.id, content: newComment }]);
  
      if (error) throw error;
  
     
      if (data && data.length > 0) {
        setComments([...comments, data[0]]);
      }
  
      setNewComment(''); 
    } catch (err) {
      setError('Error adding comment: ' + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="post-page">
      <div className="container">
        <h1 className="post-title">{post.title}</h1>
        <img className="post-image" src={post.image_url} alt={post.title} />
        <p className="post-content">{post.content}</p>

        <div className="post-actions">
          <FaThumbsUp className="action-icon" onClick={handleUpvote} />
          <span>{post.upVotes}</span>
          <FaEdit
            className="action-icon"
            onClick={() => navigate(`/edit-post/${post.id}`)}
          />
          <FaTrashAlt className="action-icon" onClick={handleDeletePost} />
        </div>

        <div className="comments-section">
          <h3>Comments</h3>
          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <p>{comment.content}</p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>

          <textarea
            className="comment-input"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          
          <Button
            text="Add Comment"
            onClick={handleAddComment}
            styleClass="add-comment-btn"
            disabled={!newComment.trim()}
          />
        </div>
      </div>
    </div>
  );
};

export default PostPage;