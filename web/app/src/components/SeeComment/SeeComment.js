import React, { useState, useEffect } from "react";
import axios from "axios";

export function SeeComment({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/api/post/seePost/${postId}/comments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [postId]);

  return (
    <div className="comments">
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <h4>{comment.user.username}</h4>
          <p>{comment.text}</p>
          <small>{new Date(comment.createAt).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
}
