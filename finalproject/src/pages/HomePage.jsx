import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom'; 
import PostCard from '../components/PostCard';
import Button from '../components/Button'; 

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('time'); // New state for sorting
  const navigate = useNavigate(); // Use navigate hook

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts from Supabase
        const { data, error } = await supabase
          .from('Posts')
          .select('*')
          .order('created_at', { ascending: false }); // Default order by time

        if (error) throw error;

        setPosts(data); // Set the posts data to state
      } catch (err) {
        setError('Error fetching posts: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(); 
  }, []);

  // Sorting posts based on the selected sorting criterion
  const sortPosts = (criterion) => {
    setSortBy(criterion);
    let sortedPosts;
    
    if (criterion === 'upvotes') {
      sortedPosts = [...posts].sort((a, b) => b.upVotes - a.upVotes); // Sort by upvotes
    } else {
      sortedPosts = [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by time
    }

    setPosts(sortedPosts); // Update state with sorted posts
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`); // Navigate to the post page when a post is clicked
  };

  if (loading) return <div className="text-center text-xl font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="home-page">
      <div className="container">
        <h1>Your Next Great Post is Just a Click Away!</h1>

        <div className="sort-buttons mb-4">
     
          <Button 
            text="Sort by Time" 
            onClick={() => sortPosts('time')} 
            styleClass={sortBy === 'time' ? 'active' : ''} 
          />
          <Button 
            text="Sort by Upvotes" 
            onClick={() => sortPosts('upvotes')} 
            styleClass={sortBy === 'upvotes' ? 'active' : ''} 
          />
        </div>

        <div className="post-cards-container">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onClick={() => handlePostClick(post.id)} 
              />
            ))
          ) : (
            <p className="no-posts">No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
