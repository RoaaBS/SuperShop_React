 import React,{useState,useEffect, useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
 import axios from 'axios';
 import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './ProductDetails.module.css';

import { Button } from 'react-bootstrap';
import { toast,Zoom } from 'react-toastify';
import { CartContext } from '../../../Components/User/context/cartContext';
 export default function ProductDetails() {
  const navigate =useNavigate();
  const {cartCount,setcartCount}=useContext(CartContext);
    const {productId}=useParams();
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const getProduct = async () => {
        try {
          const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products/${productId}`);
          setProduct(data.product);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      const addtoCart = async () => {
        try {
          const token = localStorage.getItem("userToken");
          const response = await axios.post(
            'https://ecommerce-node4.onrender.com/cart',
            { productId: productId },
            { headers: { Authorization: `Tariq__${token}` } }
          );
      
          if (response.status === 201) {
            toast.success('Product added successfully', {
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
            setcartCount(cartCount+1);
            navigate('/Cart');
          }
      
        } catch (error) {
          console.log("Error:", error.response || error.message);
          toast.error('Failed to add product to cart', {
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
        }
      };
      
      useEffect(() => {
        getProduct();
      }, []);
    
      if (isLoading) {
        return <h2>Loading..</h2>;
      }
   return (
    <div className={`d-flex justify-content-center align-items-center min-vh-100 text-xs`}>

    <div className="col-md-3 mb-4" key={product._id}>
    <Card className={styles.card}>
  <Card.Img
    className={styles.cardImgTop}
    variant="top"
    src={product.mainImage?.secure_url}
    alt={product.name}
  />
  <Card.Body className={styles.cardBody}>
    <Card.Title>{product.name}</Card.Title>
    <Card.Title>Price: {product.price}</Card.Title>
    <Card.Title className={styles.discount}>
      Discount: {product.discount}%
    </Card.Title>
    <Card.Title>Price After Discount: {product.finalPrice}</Card.Title>
    <Button onClick={addtoCart} className={styles.btn}>
      Add to Cart
    </Button>
  </Card.Body>
</Card>


  </div>
  </div>
   )
 }
 