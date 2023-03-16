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

