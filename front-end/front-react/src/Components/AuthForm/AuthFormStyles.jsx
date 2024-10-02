import React from 'react'

const container = {
    backgroundColor: '#080C93',
    // backgroundImage: 'linear-gradient(to top, #F3F3F3, #CBCBCB)',
    gap: '20px',
    width: '300px',
    height: 'auto',
    borderRadius: '20px',
    boxShadow: '10px 20px 10px #a5a5a579',
    border: '5px solid #fff',
    padding: '20px 80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    // fontFamily: roboto-regular,
    fontSize: '14px',
}

const eyeCss = {
    cursor: 'pointer',
}

const inputDiv = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '40px',
    padding: '2px 20px',
    gap: '5px',
}

const h1Css = {
    color: 'white',
    fontWeight: 'bold',
}

const buttonCss = {
    width: '113%',
    backgroundColor: '#56E126',
    height: '40px',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
}

export const AuthFormCss = {
    container,
    eyeCss,
    inputDiv,
    buttonCss,
    h1Css
}