import React, { useState } from 'react';
import axios from 'axios';
import '../../SocialMediaStyle/Login&Register.css';

export function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] =  useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3005/api/users/register', {
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
        <div className="custom">
            <h1>Cadastrar</h1>
            <form className="register-container" onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input className="form-control" type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label>
                    Email:
                    <input className="form-control" type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    Senha:
                    <input className="form-control" type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button className="btn btn-primary" type='submit'>Registrar</button>
                <div className="link-container">
                    <p>Já tem uma conta?<a href='/'>Entrar</a></p>
                </div>
            </form>
            <p>{message}</p>
        </div>
    )
}

