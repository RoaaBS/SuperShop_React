import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img from '../../../assets/image-product.svg';
import './Login.css';
export default function Login() {
 const [isLoading,setisLoading]=useState(false);
 const[serverError,setServerError]=useState(null)
 const{register,handleSubmit,formState:{errors}} =useForm();
 const navigate=useNavigate();
 const registerUser= async(value)=>{
   setisLoading(true);
   try{ const response =await axios.post(`https://ecommerce-node4.onrender.com/auth/signin`,value);
   if(response.status ==200){
    localStorage.setItem("userToken",response.data.token);
    navigate('/');
   }
console.log(response);
}
catch(error){
 console.log(error);
 setServerError(error.response.data.message);
}finally{
 setisLoading(false);
}
  
 }
  return (
    <>
    <img src={img} alt='product-img' className='login-img'/>
    <Form onSubmit={handleSubmit(registerUser)}>
     {serverError?<div className='text-danger'>{serverError}</div>:null}
    <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3 ">
       <Form.Control type="email" placeholder=""{...register("email",{required:"email is required"})} />
       {errors.email?<div className='text-danger'>{errors.email.message}</div>:null}</FloatingLabel>
     <FloatingLabel controlId="floatingPassword" label="Password">
       <Form.Control type="password" placeholder="" {...register("password",{required:"password is required"})} />
       {errors.password?<div className='text-danger'>{errors.password.message}</div>:null}
     </FloatingLabel>
     <Button  type='submit'  className='login-btn'
     disabled={isLoading}>
       {isLoading?"loading...":"Login..."}</Button>
</Form>

    </>
  )
}
