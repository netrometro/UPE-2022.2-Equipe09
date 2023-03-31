import { useState } from "react";
import axios from "axios";

export function AddComment({ postId }) {
    const [text, setText] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
    
        try {
          const res = await axios.post(
            `http://localhost:3002/api/post/seePost/${postId}/comment`,
            { text },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log(res.data);
          setText("");
        } catch (error) {
          console.log(error);
        }
      }

      return (
        <div classname="comments">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Digite seu comentário"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Comentar</button>
          </form>
        </div>
      );
}

