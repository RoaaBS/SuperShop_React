import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast,Zoom } from 'react-toastify';
export default function Orders() {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const location = useLocation();
  const cart = location.state?.cart ?? []; 

  const registerOrder = async (data) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        "https://ecommerce-node4.onrender.com/order",
        {
          couponName: data.couponName,
          address: data.address,
          phone: data.phone,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`, 
          },
        }
      );
      if (response.status === 201) {
        toast.success('Order registered successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });}
  
     
      setOrder(response.data);
    } catch (error) {
      console.error("Order registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className='d-flex justify-content-center align-items-center'>
    {cart.map((item, index) => (
  <img key={item.id || index} src={item.details.mainImage.secure_url} width="150px" height="300px" alt={item.details.name} className='pl-4' 
  />
))}

  

      <Form onSubmit={handleSubmit(registerOrder)} className='ms-5'>
        <FloatingLabel controlId="floatingInput" label="Coupon Name" className="mb-3 w-75 ms-auto me-auto ">
          <Form.Control {...register("couponName", { required: false })} type="text" placeholder="Coupon Name" />
          {errors.couponName && <p className="text-danger">Coupon name is required</p>}
        </FloatingLabel>

        <FloatingLabel controlId="floatingAdd" label="Address" className="mb-3 w-75 ms-auto me-auto">
          <Form.Control {...register("address", { required: true })} type="text" placeholder="Address" />
          {errors.address && <p className="text-danger">Address is required</p>}
        </FloatingLabel>

        <FloatingLabel controlId="floatingPhone" label="Phone" className="mb-3 w-75 ms-auto me-auto">
          <Form.Control {...register("phone", { required: true })} type="text" placeholder="Phone" />
          {errors.phone && <p className="text-danger">Phone is required</p>}
        </FloatingLabel>

        <Button type="submit" className="login-btn d-flex m-auto mb-4" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit "}
        </Button>
      </Form>
    </div>
  );
}
