import React, { useState } from 'react'
// import Input from '../Inputs/Input'
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { AuthFormCss } from './AuthFormStyles';
import FormInput from '../Inputs/FormInput';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Button from '../Buttons/Button';
import { getTokenRequest, postRequest } from '../../js/httpRequest/axios';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {

    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [password, setPassword] = useState(localStorage.getItem('password') || '');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // État pour gérer l'affichage du mot de passe
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Fonction pour basculer la visibilité du mot de passe
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsLoading(true);

        const loginFormData = new FormData();
        loginFormData.set('usernameOrEmail', email);
        loginFormData.set('password', password);

        const login = 'login';
        const loginResponse = await postRequest(login, loginFormData);

        if (loginResponse.success != false) {

            const userId = loginResponse.success.id;
            localStorage.setItem('userId', userId);
            toast.success(loginResponse.message);
            setIsLoading(false);
            setTimeout(function () {
                navigate("/dashboard");
            }, 1000);

            try {
                const response = await axios.get('https://127.0.0.1:8000/api/v1.0.0/protected-route', {
                    headers: {
                        'Authorization': `Bearer ${loginResponse.success.token}`, // Ajoute le token au header
                    },
                });
        
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
            // console.log(loginResponse.success.id);
        } else {
            console.log(loginResponse);
            toast.error(loginResponse.message);
            setIsLoading(false);
        }

    }



    return (
        <>

            <ToastContainer autoClose={2500} />
            <form onSubmit={handleSubmit} action="" style={AuthFormCss.container}>
                <h1 style={AuthFormCss.h1Css}>Connexion</h1>
                <div style={AuthFormCss.inputDiv}>
                    <FormInput
                        type={"text"}
                        placeholder={"Email ou nom d'utilisateur"}
                        reference={"email"}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                </div>
                <div style={AuthFormCss.inputDiv}>
                    <FormInput
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder={"Mot de passe"}
                        reference={"password"}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />

                    <span onClick={togglePasswordVisibility}>
                        {passwordVisible ? <FaEyeSlash size={25} style={AuthFormCss.eyeCss} /> : <FaEye size={25} style={AuthFormCss.eyeCss} />} {/* Icône pour afficher/masquer */}
                    </span>
                </div>
                <Button
                    type={'submit'}
                    disabled={isLoading}
                    style={AuthFormCss.buttonCss}
                    text={isLoading ? "chargement ..." : "Connecter"}
                />
                <Link style={{
                    color: 'white',
                    textAlign: 'right',
                    textDecoration: 'underline',
                    width: '100%',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }} to="/register">Créer un compte ?</Link>

            </form>
        </>
    )
}
