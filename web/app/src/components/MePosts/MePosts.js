import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link  } from 'react-router-dom';

export function MePosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get('http://localhost:3002/api/post/myPosts', config);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <div>
        {posts.map(post => (
          <div key={post.id} className="post">
          <div className="post-header">
            {/* <img src={post.user.profileimageURL} alt={post.user.username} /> */}
            <h3>{post.user.username}</h3>
          </div>
          <div className="post-content">
            <img src={post.imageURL} alt={post.imageURL} />
            <p>{post.caption}</p>
          </div>
          <div>
          <Link to={`/post/${post.id}`}><button>Ver Postagem</button></Link>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

