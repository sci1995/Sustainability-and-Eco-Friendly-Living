import React, { useState } from 'react';
import { supabase } from '../client'; 
import Button from '../components/Button'; 
import InputField from '../elements/InputField'; 

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // URL for the image
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Insert the post into the Supabase Posts table with the provided image URL
      const { data, error } = await supabase
        .from('Posts')
        .insert([
          {
            title: title,
            content: content,
            imageUrl: imageUrl, // Use the image URL entered by the user
            created_at: new Date().toISOString(),
            upVotes: 0,
          },
        ]);

      if (error) {
        throw error; // If an error occurs, throw it to be caught in the catch block
      }

      // Clear the form and display success message
      setTitle('');
      setContent('');
      setImageUrl('');
      setSuccess('Post created successfully!');
      setError(null); // Reset error message
    } catch (error) {
      setError('Error creating post: ' + error.message); // Display error message
      setSuccess(null); // Reset success message
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  return (
    <div className="create-post-page container p-4 mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Create a New Post</h1>

      {/* Success message */}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      {/* Error message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleCreatePost} className="space-y-4">
        {/* Title input */}
        <InputField
          type="text"
          placeholder="Enter the title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          required
        />

        {/* Content input */}
        <InputField
          type="textarea"
          placeholder="Enter the content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          name="content"
          required
        />

        {/* Image URL input */}
        <InputField
          type="url"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          name="image_url"
        />

        {/* Submit button */}
        <div>
          <Button
            text={loading ? 'Creating Post...' : 'Create Post'}
            onClick={handleCreatePost}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;


