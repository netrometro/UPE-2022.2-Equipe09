import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../../SocialMediaStyle/Profile.css";

export function MeProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3002/api/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="profile-container">
      {user && (
        <>
          <div className="profile-background">
            <img src="https://picsum.photos/800/300" alt="Profile background" />
          </div>
          <div className="profile-avatar">
            <img src={user.profileimageURL || `https://picsum.photos/200/200/?random=${id}`} alt={user.username} />
          </div>
          <div className="profile-info">
          <Link to="/home" className="back-button"><button>Voltar</button></Link>
            <h2>{user.username}</h2>
            <Link to="/edit-profile"><button>Editar Perfil</button></Link>
          </div>
        </>
      )}
    </div>
  );
}

