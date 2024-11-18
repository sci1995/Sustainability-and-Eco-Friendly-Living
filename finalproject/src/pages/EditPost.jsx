import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client'; // Assuming you're using Supabase
// import './EditPostPage.css'; // Add your custom styling for the edit page

const EditPost = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState({
    title: '',
    content: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate between pages

  // Fetch post data based on the ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('Posts')
          .select('*')
          .eq('id', id)
          .single(); // Fetch a single post by ID

        if (error) throw error;
        setPost(data); // Set the post data to state
      } catch (err) {
        setError('Error fetching post: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  // Handle form submission to update the post
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from('Posts')
        .update({
          title: post.title,
          content: post.content,
          imageUrl: post.imageUrl
        })
        .eq('id', id);

      if (error) throw error;
      navigate(`/post/${id}`); // Redirect to the post page after successful update
    } catch (err) {
      setError('Error updating post: ' + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="edit-post-page">
      <h1>Edit Post</h1>

      <form onSubmit={handleSubmit} className="edit-post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            required
            className="form-control"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={post.imageUrl}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Update Post</button>
          <button
            type="button"
            onClick={() => navigate(`/post/${id}`)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
