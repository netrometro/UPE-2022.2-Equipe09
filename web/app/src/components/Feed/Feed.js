import { useEffect, useState } from "react";
import axios from "axios";

export function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/post/getAll",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.log(error);
        alert("Erro ao buscar posts");
      }
    };

    fetchPosts();
  }, []);
  
  return (
    <div className="feed">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">
            {/* <img src={post.user.profileimageURL} alt={post.user.username} /> */}
            <h3>{post.user.username}</h3>
          </div>
          <div className="post-content">
            <img src={post.imageURL} alt={post.imageURL} />
            <p>{post.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

