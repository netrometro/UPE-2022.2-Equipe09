import React, { useState } from 'react';
import axios from 'axios';
import '../../SocialMediaStyle/Login&Register.css';
import { useNavigate } from 'react-router-dom';
import { login  } from '../Auth/Auth';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3005/api/users/login', {
                email,
                password
            });

            login(response.data.token);
            setMessage('Logado com sucesso');
            navigate('/home');
        }   catch(error) {
            console.log(error);
            setMessage('Erro ao efetuar login');
        }
    };

    return (
        <div className="custom">
            <h1>Entrar</h1>
            <form className="custom" onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input className="custom" type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    Senha:
                    <input className="custom" type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button className="custom" type='submit'>Entrar</button>
                <div className="custom">
                    <p>Não tem uma conta? <a href='/register'>Cadastrar-se</a></p>
                </div>
            </form>
            <p className="custom">{message}</p>
        </div>
    );
};

