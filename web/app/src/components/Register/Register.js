import React, { useState } from 'react';
import axios from 'axios';
import '../../SocialMediaStyle/Style.css';

export function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] =  useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3002/api/users/register', {
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

    return (
        <div>
            <h1>Cadastrar</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label>
                    Email:
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    Senha:
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button type='submit'>Registrar</button>
                <div>
                    <p>Já tem uma conta?<a href='/'>Entrar</a></p>
                </div>
            </form>
            <p>{message}</p>
        </div>
    )
}