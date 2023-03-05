import React, { useState } from 'react';
import axios from 'axios';
import '../../style.css';
import { Link } from 'react-router-dom';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/login', {
                email,
                password
            });

            setMessage('Logado com sucesso');
        }   catch(error) {
            console.log(error);
            setMessage('Erro ao efetuar login');
        }
    };
}