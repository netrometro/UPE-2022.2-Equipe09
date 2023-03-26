import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { UpdatePost } from "../UpdatePost/UpdatePost";
import '../../SocialMediaStyle/SeePost.css';

export function SeePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(null);

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

  const handleUpdate = (updatedPost) => {
    setPost(updatedPost);
    setIsEditing(false);
  };

  return (
    <div className="post">
      <div className="post-header">
        <h3>{post.user.username}</h3>
      </div>
      {isEditing ? (
        <UpdatePost post={post} onUpdate={handleUpdate} />
      ) : (
        <div className="post-content">
          <img src={post.imageURL} alt={post.imageURL} />
          <p>{post.caption}</p>
        </div>
      )}
      <div>
      <button onClick={() => setIsEditing(true)}>Editar</button>
      <Link to="/profile/me"><button>Voltar</button></Link>
      </div>
    </div>
  );
}

