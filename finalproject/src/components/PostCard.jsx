
import React from 'react';
import { formatDistanceToNow } from 'date-fns'; // Import the function from date-fns
import { FaThumbsUp } from 'react-icons/fa'; // Import the thumbs-up icon from React Icons

const PostCard = ({ post, onClick }) => {
  const { title, created_at, upVotes } = post;

  // Format the created_at date to show time ago 
  const timeAgo = formatDistanceToNow(new Date(created_at), { addSuffix: true });

  return (
    <div className="post-card border p-4 mb-4 rounded-lg shadow-lg" onClick={onClick} style={{ cursor: 'pointer' }}>
      <p className="text-gray-500 text-sm mb-4">{timeAgo}</p>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      
      <div className="flex items-center">
        
        <span className="text-gray-700 font-bold"> {upVotes}    </span>
        <FaThumbsUp className="mr-2 text-gray-700" /> 
      </div>
    </div>
  );
};

export default PostCard;

