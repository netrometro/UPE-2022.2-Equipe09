import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../../SocialMediaStyle/UptadeUser.css';

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

