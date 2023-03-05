import React, { useState } from 'react';
import axios from 'axios';
/* import '../../style.css'; */

export function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] =  useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/register', {
                username,
                email,
                password
            });
            setMessage('Cadastrado com Sucesso!!!');
        }   catch (error) {
            console.log(error);
            setMessage('Erro ao cadastrar, tente mais tarde');
        }
    };
}