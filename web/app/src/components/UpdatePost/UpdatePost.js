import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../../SocialMediaStyle/UpdatePost.css';

export function UpdatePost({ post, onUpdate }) {
  const [caption, setCaption] = useState(post.caption);
  const [imageURL, setImageURL] = useState(post.imageURL);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3002/api/post/update/${id}`,
        { caption, imageURL },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      onUpdate(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="update-post-form">
      <div className="update-post-caption">
        <label htmlFor="caption">Caption:</label>
        <input
          type="text"
          id="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>
      <div className="update-post-image">
        <label htmlFor="imageURL">URL da imagem:</label>
        <input
          type="text"
          id="imageURL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
      </div>
      <button type="submit" className="update-post-button">Atualizar</button>
    </form>
  );
}

