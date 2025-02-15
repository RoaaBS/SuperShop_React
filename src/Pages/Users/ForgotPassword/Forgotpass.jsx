import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Forgetpass.css';
export default function Forgotpass() {
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const location = useLocation();

    // Extract email from URL query parameters
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const email = params.get('email');
        if (email) {
            setValue('email', email); // Prefill email field
        }
    }, [location.search, setValue]);

    const resetPassword = async (value) => {
        setIsLoading(true);
        try {
            const response = await axios.patch(`https://ecommerce-node4.onrender.com/auth/forgotPassword`, value);
            if (response.status === 200) {
                alert("Password reset request successful! Check your email for further instructions.");
                navigate('/'); 
            }
        } catch (error) {
            setServerError(error.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <div className='login-container'>
        <Form onSubmit={handleSubmit(resetPassword)}>
                {serverError && <div className='text-danger'>{serverError}</div>}

                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                    <Form.Control type="email" {...register("email", { required: "Email is required" })} readOnly />
                    {errors.email && <div className='text-danger'>{errors.email.message}</div>}
                </FloatingLabel>

                <FloatingLabel controlId="floatingCode" label="Reset Code" className="mb-3">
          <Form.Control type="text" {...register("code", { required: "Code is required" })} />
           {errors.code && <div className='text-danger'>{errors.code.message}</div>}
        </FloatingLabel>

       <FloatingLabel controlId="floatingNewPassword" label="New Password">
       <Form.Control type="password" {...register("password", { required: "New password is required" })} />
        {errors.password && <div className='text-danger'>{errors.password.message}</div>}
       </FloatingLabel>


                <Button type='submit' className='login-btn' disabled={isLoading}>
                    {isLoading ? "Resetting..." : "Reset Password"}
                </Button>
            </Form>
        </div>
    );
}
