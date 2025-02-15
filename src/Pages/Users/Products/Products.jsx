import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import  styles from './products.module.css';
import Pro from '../../../assets/Pro.png'

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = async () => {
    try {
      const { data } = await axios.get('https://ecommerce-node4.onrender.com/products?page=1&limit=10');
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container mt-4">
      <img src={Pro} className={styles.headerImage}/>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product._id}>
            <Card  className={styles.card}>
              <Card.Img
                variant="top"
                src={product.mainImage?.secure_url}
                alt={product.name}
                className={styles.cardimgtop}
              />
              <Card.Body className={styles.cardBody}>
                <Card.Title className={styles.title}>{product.name}</Card.Title>
               
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
