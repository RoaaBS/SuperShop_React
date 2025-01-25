import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AuthLayout from './Layout/AuthLayout'
import DashboardLayout from './Layout/DashboardLayout'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Pages/Users/Login/Login'
import Register from './Pages/Users/Register/Register'
import { ToastContainer } from 'react-toastify';
function App() {
 const router =createBrowserRouter([
  {path:"/",
element:<AuthLayout/>,
children:[{ 
  path:"/login",
element:<Login/>},
{
  path:"/register",
  element:<Register/>
},
],
},
{path:"/dashboard",
element:<DashboardLayout/>}
 ])

  return (
    <>
    <ToastContainer/>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
