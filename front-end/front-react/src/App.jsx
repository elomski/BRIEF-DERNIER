// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './Components/AuthForm/LoginForm'

function App() {

  return (
    <>
      {/* <FormInput /> */}
      <div>
        <LoginForm
          card_type="Connexion"
        />
      </div>
    </>
  )
}

export default App
