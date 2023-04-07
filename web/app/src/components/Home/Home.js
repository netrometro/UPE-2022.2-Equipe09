import { useNavigate, Link } from "react-router-dom";
import { isAuthenticated, logout } from "../Auth/Auth";
import { useState } from "react";
import axios from "axios";
import "../../SocialMediaStyle/Home.css";
import { Post } from "../CreatePost/CreatePost";
import { Feed } from "../Feed/Feed";

export function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  if (!isAuthenticated()) {
    navigate("/");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:3002/api/users/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
      alert("Usuário não encontrado");
    }
  };

  return (
    <div className="home">
      <div className="header">
        <div className="logo">
          <h1>Social Midia</h1>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Find People"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="menu">
          <Link to="/profile/me">
            <button>Profile</button>
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="content">
        {user && (
          <div className="user-info">
            <h3>Usuário com esse nome {username}:</h3>
              <ul>
                {user.map((user) => (
                  <li key={user.id}>
                    <Link to={`/profile/${user.id}`}>
                      {user.username}
                    </Link>
                  </li>
                ))}
              </ul>
          </div>
          )}
        </div>
      <div className="operation">
        <div className="posts">
          <Post />
        </div>
        <div className="feed">
          <Feed />
        </div>
      </div>
    </div>
  );
}
