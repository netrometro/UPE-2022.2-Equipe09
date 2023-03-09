import React, { useState } from 'react';
import axios from 'axios';
import '../../SocialMediaStyle/Style.css';
import { Navigate, useNavigate } from 'react-router-dom';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3002/api/users/login', {
                email,
                password
            });

            setMessage('Logado com sucesso');
            navigate('/home');
        }   catch(error) {
            console.log(error);
            setMessage('Erro ao efetuar login');
        }
    };

    return (
        <div>
            <h1>Entrar</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    Senha:
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button type='submit'>Entrar</button>
                <div>
                    <p>Não tem uma conta? <a href='/register'>Cadastrar-se</a></p>
                </div>
            </form>
            <p>{message}</p>
        </div>
    );
};