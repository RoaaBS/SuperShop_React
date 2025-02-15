import React from 'react'
import { Navigate } from 'react-router-dom';
  
  export default function AuthProtectedRouter({children}) {
    const token =localStorage.getItem("userToken");
    if(token){
       return <Navigate to='/'/>

    }
    return children;

  }
  