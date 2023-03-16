import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../../SocialMediaStyle/UpdateUser.css';

export function UpdateUser() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    profileimageURL: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        "http://localhost:3002/api/users/updateprofile",
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccessMessage("Perfil atualizado com sucesso! Agora você pode retornar ao seu perfil");
      setErrorMessage("");
    } catch (error) {
      console.log(error);
      setSuccessMessage("");
      setErrorMessage("Falha ao atualizar perfil.");
    }
  };

  return (
    <div className="form-container custom">
      <h2 className="custom">Atualizar Perfil</h2>
      {successMessage && <p className="custom">{successMessage}</p>}
      {errorMessage && <p className="custom">{errorMessage}</p>}
      <form className="custom" onSubmit={handleSubmit}>
        <div className="custom">
          <label htmlFor="username">Nome de usuário</label>
          <input
            className="custom"
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="custom">
          <label className="custom" htmlFor="email">Email</label>
          <input
            className="custom"
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="custom">
          <label className="custom" htmlFor="password">Senha</label>
          <input
            className="custom"
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="custom" htmlFor="profileimageURL">URL da imagem de perfil</label>
          <input
            type="text"
            id="profileimageURL"
            name="profileimageURL"
            value={userData.profileimageURL}
            onChange={handleInputChange}
          />
        </div>
        <button className="custom" type="submit">Atualizar</button>
        <Link className="custom" to="/profile/me">Cancelar</Link>
        <Link className="custom" to="/profile/me">Voltar ao Perfil</Link>
      </form>
    </div>
  );
}

