import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Category.css';
export default function Categories() {
  const [categories, setCategories] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = async () => {
    try {
      const { data } = await axios.get('https://ecommerce-node4.onrender.com/categories/active?page=1&limit=3');
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) {
    return <h2>Loading..</h2>;
  }

  return (
    < div className="category container min-vh-100  mt-4">
      <div className="row">
       {categories.map((category) => (
          <div className="col-md-3 mb-4" key={category._id}>
            <Card  className='card '>
              <Card.Img
                variant="top"
                src={category.image.secure_url} alt={category.name} 
              />
              <Card.Body>
                <Card.Title className='title'>{category.name}</Card.Title>
               
                <Link to={`/categories/${category._id}`} className='btn'> products</Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    
    </div>
  );
}
