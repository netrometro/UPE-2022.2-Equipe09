import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import '../../SocialMediaStyle/SeePost.css';
import { AddComment } from "../AddComment/AddComment";
import { SeeComment } from "../SeeComment/SeeComment";

export function SeeFeedPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/api/post/seePost/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="post">
      <div className="post-header">
        <h3>{post.user.username}</h3>
      </div>
        <div className="post-content">
          <img src={post.imageURL} alt={post.imageURL} />
          <p>{post.caption}</p>
        </div>
      <div>
      <Link to="/home"><button>Voltar</button></Link>
      </div>
      <div className="add-comment">
        <AddComment postId={id} />
      </div>
      <div className="post-comments">
        <SeeComment postId={id} />
      </div>
    </div>
  );
}

