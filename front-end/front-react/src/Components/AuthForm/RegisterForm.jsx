import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { AuthFormCss } from './AuthFormStyles';
import FormInput from '../Inputs/FormInput';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Button from '../Buttons/Button';
import { postRequest } from '../../js/httpRequest/axios';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterForm() {
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [password, setPassword] = useState(localStorage.getItem('password') || '');
    const [password_confirmation, setPassword_confirmation] = useState(localStorage.getItem('password_confirmation') || '');
    const [first_name, setFirst_name] = useState(localStorage.getItem('first_name') || '');
    const [last_name, setLast_name] = useState(localStorage.getItem('last_name') || '');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // État pour gérer l'affichage du mot de passe
    const [passwordConfirmationVisible, setPasswordConfirmationVisible] = useState(false);

    // Fonction pour basculer la visibilité du mot de passe
    const togglePasswordConfirmationVisibility = () => {
        setPasswordConfirmationVisible(!passwordConfirmationVisible);
    };

    // État pour gérer l'affichage du mot de passe
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Fonction pour basculer la visibilité du mot de passe
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsLoading(true);

        const registerFormData = new FormData();
        registerFormData.set('email', email);
        registerFormData.set('first_name', first_name);
        registerFormData.set('last_name', last_name);
        registerFormData.set('password_confirmation', password_confirmation);
        registerFormData.set('password', password);

        const register = 'register';
        const registerResponse = await postRequest(register, registerFormData);

        if (registerResponse.success != false) {
            toast.success(registerResponse.message);
            setIsLoading(false);
            setTimeout(function () {
                navigate('/otp_code/' + email);
                // navigate(`/otp_code/${email}`);
            }, 1000);
            console.log(registerResponse.data);
        } else {
            console.log(registerResponse);
            toast.error(registerResponse.message);
            setIsLoading(false);
        }

    }



    return (
        <>

            <ToastContainer autoClose={2500} />
            <form onSubmit={handleSubmit} action="" style={AuthFormCss.container}>
                <h1 style={AuthFormCss.h1Css}>Inscription</h1>
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
                        type={"text"}
                        placeholder={"Nom"}
                        reference={"last_name"}
                        value={last_name}
                        onChange={(e) => {
                            setLast_name(e.target.value)
                        }}
                    />
                </div>
                <div style={AuthFormCss.inputDiv}>
                    <FormInput
                        type={"text"}
                        placeholder={"Prénom"}
                        reference={"first_name"}
                        value={first_name}
                        onChange={(e) => {
                            setFirst_name(e.target.value)
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
                <div style={AuthFormCss.inputDiv}>
                    <FormInput
                        type={passwordConfirmationVisible ? 'text' : 'password'}
                        placeholder={"Confirmer le mot de passe"}
                        reference={"password_confirmation"}
                        value={password_confirmation}
                        onChange={(e) => {
                            setPassword_confirmation(e.target.value)
                        }}
                    />

                    <span onClick={togglePasswordConfirmationVisibility}>
                        {passwordConfirmationVisible ? <FaEyeSlash size={25} style={AuthFormCss.eyeCss} /> : <FaEye size={25} style={AuthFormCss.eyeCss} />} {/* Icône pour afficher/masquer */}
                    </span>
                </div>
                <Button
                    type={'submit'}
                    disabled={isLoading}
                    style={AuthFormCss.buttonCss}
                    text={isLoading ? "chargement ..." : "S'inscrire"}
                />
                <Link style={{
                    color: 'white',
                    textAlign: 'right',
                    textDecoration: 'underline',
                    width: '100%',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }} to="/">Créer un compte ?</Link>

            </form>
        </>
    )

}
