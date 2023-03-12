import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import '../../SocialMediaStyle/Profile.css';

export function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/api/users/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <div className="profile-container">
      {user && (
        <>
          <div className="profile-background">
            <img src="https://picsum.photos/800/300" alt="Profile background" />
          </div>
          <div className="profile-avatar">
            <img src="https://picsum.photos/200" alt={user.username} />
          </div>
          <div className="profile-info">
            <h2>{user.username}</h2>
            <p>{user.bio}</p>
          </div>
        </>
      )}
    </div>
  );
}

