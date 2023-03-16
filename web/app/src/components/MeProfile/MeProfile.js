import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export function MeProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
