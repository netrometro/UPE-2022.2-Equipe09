import { useState } from "react";
import axios from "axios";
import '../../SocialMediaStyle/Home.css';

export function Post() {
    const [caption, setCaption] = useState("");
    const [imageURL, setImageURL] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3002/api/post/post/cre", {
                caption,
                imageURL
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
            );
            console.log(response.data);
            setCaption("");
            setImageURL("");
        }   catch (error) {
            console.log(error);
            alert("erro ao criar postagem");
        }
    };

    return (
        <div className="post-form">
          <h2>Criar post</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="caption">Legenda</label>
              <input
                type="text"
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="imageURL">URL da imagem</label>
              <input
                type="text"
                id="imageURL"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
              />
            </div>
            <button type="submit">Criar</button>
          </form>
        </div>
      );
}

