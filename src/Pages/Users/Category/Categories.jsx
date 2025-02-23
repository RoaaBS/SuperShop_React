import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Category.module.css';
import img1 from '../../../assets/Ca.png';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = async () => {
    try {
      const { data } = await axios.get('https://ecommerce-node4.onrender.com/categories');
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) {
    return <h2 className={styles.loading}>Loading...</h2>;
  }
  return (
    <div className={`container min-vh-100 mt-4 ${styles.category}`}>
      <img src={img1} className={styles.headerImage} alt="Category Banner" />
      <div className="row">
        {categories.map((category) => (
          <div className="col-md-3 mb-4" key={category._id}>
            <Card className={styles.card}>
              <Card.Img
                variant="top"
                src={category.image.secure_url}
                alt={category.name}
                className={styles.cardimgtop}
              />
              <Card.Body className={styles.cardBody}>
                <Card.Title className={styles.title}>{category.name}</Card.Title>
                <Link to={`/categories/${category._id}`} className={styles.button}>
                  Products
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
