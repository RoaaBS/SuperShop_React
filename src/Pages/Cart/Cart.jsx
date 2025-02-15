import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { FaRegTrashAlt } from "react-icons/fa";
export default function Cart() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const deleteCart = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.patch(
        "https://ecommerce-node4.onrender.com/cart/clear",
        {}, 
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setCart([]); 
    } catch (error) {
      console.error("Can't Delete Cart", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem=async (productId)=>{
    try{
      const token =localStorage.getItem("userToken");
        const response =await axios.patch('https://ecommerce-node4.onrender.com/cart/removeItem',
        { productId },
        {
        headers:{
          Authorization:`Tariq__${token}`,
        }
      });
      setCart([]);
    }catch(error){
      console.log("can't remove item ",error)
    }finally{
      setIsLoading(false);
    }
   
  }
  

  const getCart = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get('https://ecommerce-node4.onrender.com/cart', {
        headers: { Authorization: `Tariq__${token}` },
      });
      setCart(response.data.products);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const incQty = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.patch(
        'https://ecommerce-node4.onrender.com/cart/incraseQuantity',
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );

      setCart(prevCart =>{
        return prevCart.map(item =>{
          if(item.productId == productId){
        return { ...item, quantity: item.quantity + 1 };
          } 
           return item;
      })
    });
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const decQty = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.patch(
        'https://ecommerce-node4.onrender.com/cart/decraseQuantity',
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );

      setCart(prevCart =>{
        return prevCart.map(item =>{
          if (item.productId == productId  ){
            return { ...item, quantity: item.quantity - 1 }
          }
          return item;
            
    })
  });
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.details.mainImage.secure_url} width="50px" alt={item.details.name} />
              </td>
              <td>{item.details.name}</td>
              <td>{item.details.finalPrice}$</td>
              <td>
                <Button onClick={() => incQty(item.productId)}>+</Button>
                {item.quantity}
                <Button onClick={() => decQty(item.productId)}>-</Button>
                <Button className='ms-5 bg-danger border-danger' onClick={() => deleteItem(item.productId)}><FaRegTrashAlt /></Button>
              </td>
              <td>{item.quantity * item.details.finalPrice}$</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button style={{ backgroundColor: "#030355", color: "#fff",borderColor:"#030355" }} onClick={() => deleteCart()}>
  Delete Cart
</Button>

    </div>
  );
}
