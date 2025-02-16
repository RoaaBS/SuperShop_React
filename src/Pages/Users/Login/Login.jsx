import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from'./Login.module.css';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [emailSent, setEmailSent] = useState(null); 
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  const registerUser = async (value) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`https://ecommerce-node4.onrender.com/auth/signin`, value);
      if (response.status === 200) {
        localStorage.setItem("userToken", response.data.token);
        navigate('/');
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      setServerError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const sendResetCode = async () => {
    const email = watch("email"); // Get the entered email
    if (!email) {
      setServerError("Please enter your email first.");
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await axios.patch(`https://ecommerce-node4.onrender.com/auth/sendcode`, { email });
      setEmailSent(response.data.message);
        if (response.status === 200) {
        setEmailSent(response.data.message);
        setServerError(null); // Clear any errors
        navigate(`/forgotpassword?email=${email}`); // Navigate to Forgot Password page
      }
    } catch (error) {
      setServerError(error.response?.data?.message || "Failed to send reset code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.login_container}>
      <Form onSubmit={handleSubmit(registerUser)}>
        {serverError && <div className='text-danger'>{serverError}</div>}
        {emailSent && <div className='text-success'>{emailSent}</div>}

        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
          <Form.Control type="email" {...register("email", { required: "Email is required" })} />
          {errors.email && <div className='text-danger'>{errors.email.message}</div>}
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control type="password" {...register("password", { required: "Password is required" })} />
          {errors.password && <div className='text-danger'>{errors.password.message}</div>}
        </FloatingLabel>

        <Button type='submit' className={style.login_btn} disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>

        <Button variant="link" className={style.login_btn} onClick={sendResetCode} disabled={isLoading}>
          {isLoading ? "Sending..." : "Forgot Password"}
        </Button>
      </Form>
    </div>
  );
}
