import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UserContext } from '../../../Components/User/context/UserContext';
import { useContext } from 'react';
import axios from 'axios';
import { SpinnerCircular } from 'spinners-react';
export default function Image() {
const {register,handleSubmit,formState:{errors}}=useForm();
const {user,loading} =useContext(UserContext);
const[imagePreview,setImagePreview]=useState(null);
const [isLoading, setIsLoading] = useState(false);
const updateImage = async (data) => {
    if (!data.Image || data.Image.length === 0) {
        toast.error('Please select an image to upload');
        return;
    }

    const token = localStorage.getItem('userToken');
    const formData = new FormData();
    formData.append("image", data.Image[0]);
    console.log(formData);

    try {
        setIsLoading(true);
        const response = await axios.put("https://ecommerce-node4.onrender.com/user/update-image", formData, {
            headers: {
                Authorization: `Tariq__${token}`
            }
        });

        if (response.status === 200) {
            toast.success('Image updated successfully');
        }
        console.log(response);

    } catch (e) {
        console.log(e);
        toast.error('Failed to update image');
    }finally{
        setIsLoading(false);
    }
};
const handlechange=(event)=>{
    const file=event.target.files[0];
    setImagePreview(URL.createObjectURL(file));
console.log(file);
}
if(isLoading)
return(<div className='d-flex justify-content-center align-item-center vh-100'>
    <SpinnerCircular speed={100} size={60} thickness={100} color='blue' secondaryColor='lightgray' />

</div>)
   

  return (
    <div className='profile-container'>
    <Form onSubmit={handleSubmit(updateImage)} encType='multipart/form-data' className='ms-5'>
      <Form.Group controlId="updateimg" className="mb-3 ms-5">
        <Form.Label className='ms-5'>Update profile pic</Form.Label>
        <Form.Control type="file"  {...register('Image')} onChange={handlechange}/>
      </Form.Group>
      {imagePreview?  <img src={imagePreview} width={200}/>:<img src={user?.Image?.secure_url} width={200}/>}
     
      <Button type='submit' className='ms-5 mb-2'>Update</Button>
    </Form>
    </div>
  )
}
