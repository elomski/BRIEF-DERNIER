import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { postRequest } from '../../js/httpRequest/axios';
import { toast, ToastContainer } from 'react-toastify';
import FormInput from '../Inputs/FormInput';
import { AuthFormCss } from './AuthFormStyles';
import { FaEyeSlash } from 'react-icons/fa';
import Button from '../Buttons/Button';
import 'react-toastify/dist/ReactToastify.css';

export default function OtpCodeForm() {
    const [code, setCode] = useState(localStorage.getItem('code') || '');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsLoading(true);

        const checkOtpCodeFormData = new FormData();
        checkOtpCodeFormData.set('email', params.email);
        checkOtpCodeFormData.set('otp_code', code);

        const checkOtpCode = 'checkOtpCode';
        const checkOtpCodeResponse = await postRequest(checkOtpCode, checkOtpCodeFormData);

        if (checkOtpCodeResponse.success) {
            toast.success(checkOtpCodeResponse.message);
            setIsLoading(false);
            setTimeout(function () {
                navigate("/");
            }, 1000);
            console.log(params.email);
            console.log(checkOtpCodeResponse.message);
        } else {
            console.log(checkOtpCodeResponse);
            toast.error(checkOtpCodeResponse.message);
            setIsLoading(false);
        }

    }



    return (
        <>

            <ToastContainer autoClose={2500} />
            <form onSubmit={handleSubmit} action="" style={AuthFormCss.container}>
                <h1 style={AuthFormCss.h1Css}>Confirmation de l'email</h1>
                <div style={AuthFormCss.inputDiv}>
                    <FormInput
                        type={'text'}
                        placeholder={"Code de vérification"}
                        reference={"code"}
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value)
                        }}
                    />
                </div>
                <Button
                    type={'submit'}
                    disabled={isLoading}
                    style={AuthFormCss.buttonCss}
                    text={isLoading ? "Vérification ..." : "Vérifier"}
                />
            </form>
        </>
    )
}
