import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import Register from './Pages/Register/Register.jsx'
import OtpCode from './Pages/OtpCode/OtpCode.jsx'

const router = createBrowserRouter([
  {
    // pour afficher la page qui vient dès qu'on lance le site
    path: "/",
    element: <App />,
  },
  //--------------------------------------------
  {
    // pour afficher la page qui vient dès qu'on lance le site
    path: "/dashboard",
    element: <Dashboard />,
  },
  //--------------------------------------------
  {
    // pour afficher la page qui vient dès qu'on lance le site
    path: "/register",
    element: <Register />,
  },
  //--------------------------------------------
  {
    // pour afficher la page qui vient dès qu'on lance le site
    path: "/otp_code/:email",
    element: <OtpCode />,
  },
  //--------------------------------------------
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )