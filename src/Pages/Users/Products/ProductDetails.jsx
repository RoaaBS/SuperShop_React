 import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
 import axios from 'axios';
 import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductDetails.css';
 export default function ProductDetails() {
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
    
      useEffect(() => {
        getProduct();
      }, []);
    
      if (isLoading) {
        return <h2>Loading..</h2>;
      }
   return (
    <div className='d-flex justify-content-center align-items-center min-vh-100 text-xs'>
    <div className="col-md-3 mb-4" key={product._id}>
    <Card className='card'>
      <Card.Img
        variant="top"
        src={product.mainImage?.secure_url}
        alt={product.name}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Title> Price: {product.price}</Card.Title>
        <Card.Title className='discount'>Discount: {product.discount}%</Card.Title>
        <Card.Title>Price After Discount: {product.finalPrice}</Card.Title>
        
      </Card.Body>
    </Card>
  </div>
  </div>
   )
 }
 