 import React, { useState } from 'react'
 import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast,Zoom } from 'react-toastify';
import axios from 'axios';
import style from '../Login/Login.module.css'
 export default function Register() {
  const [isLoading,setisLoading]=useState(false);
  const[serverError,setServerError]=useState(null)
  const{register,handleSubmit,formState:{errors}} =useForm();
  const navigate=useNavigate();
  const registerUser= async(value)=>{
    setisLoading(true);
    try{ const response =await axios.post(`https://ecommerce-node4.onrender.com/auth/signup`,value)
    if(response.status ==201){
     
      toast.success('Please check your email', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
        });
      navigate('/login');
    }
console.log(response);}
catch(error){
  if(error.response.status===409){
    setServerError("email is already in use");
  }else{  
    setServerError(error.response.data.message);}


}finally{
  setisLoading(false);
}
   
  }
   return (
     <div className={style.login_container}>
  
     <Form onSubmit={handleSubmit(registerUser)}>
      {serverError?<div className='text-danger'>{serverError}</div>:null}
     <FloatingLabel controlId="floatingInput" label="User Name" className="mb-3">
        <Form.Control type="text" placeholder="" {...register("userName",{required:"user name is required"})} />
        {errors.userName?<div className='text-danger'>{errors.userName.message}</div>:null}</FloatingLabel>

     <FloatingLabel controlId="floatingemail" label="Email address" className="mb-3">
        <Form.Control type="email" placeholder=""{...register("email",{required:"email is required"})} />
        {errors.email?<div className='text-danger'>{errors.email.message}</div>:null}</FloatingLabel>

      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="" {...register("password",{required:"password is required"})} />
        {errors.password?<div className='text-danger'>{errors.password.message}</div>:null}
      </FloatingLabel>
      <Button  type='submit' className={style.login_btn}
      disabled={isLoading}>
        {isLoading? "Sending":"Register..."}</Button>
</Form>

     </div>
   )
 }
 