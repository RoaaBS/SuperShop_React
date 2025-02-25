import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import styles from './products.module.css'
import img from '../../../assets/p.png'
import { SpinnerCircular } from 'spinners-react';
export default function CategoryProduct() {
    const {categoryId}=useParams();
    const [products, setProducts] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);
  
    const getProducts = async () => {
      try {
        const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products/category/${categoryId}`);
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      getProducts();
    }, []);
  
    if (isLoading) {
      return (
        <div className='d-flex justify-content-center align-item-center vh-100'>
          <SpinnerCircular sixw={60} speed={100} thickness={100}  color='blue' secondaryColor='lightgray' />
        </div>
      )
    }
    if (products.length === 0) {
      return <h2 className='m-4'>No products available in this category.</h2>;
    }
  return (
   
    < div className="category container  mt-4">
      <img src={img}/>
<div className="row">
  {products.map((product) => (
    <div className="col-md-3 mb-4" key={product._id}>
      <Card className={styles.card}>
        <Card.Img
          variant="top"
          src={product.mainImage.secure_url}
          alt={product.name}
          className={styles.cardimgtop}
        />
        <Card.Body className={styles.title}>
          <Card.Title className={styles.cardtitles}>{product.name}</Card.Title>
          <Link to={`/products/${product._id}`} className={styles.btn}>
            Details
          </Link>
        </Card.Body>
      </Card>
    </div>
  ))}
</div>

  
  </div>

 
  );
}
