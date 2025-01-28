import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
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
      return <h2>Loading..</h2>;
    }
  return (
   
    < div className="category container  mt-4">
<div className="row">
  {products.map((product) => (
    <div className="col-md-3 mb-4" key={product._id}>
      <Card className="card">
        <Card.Img
          variant="top"
          src={product.mainImage.secure_url}
          alt={product.name}
          className="card-img-top"
        />
        <Card.Body className="card-body">
          <Card.Title>{product.name}</Card.Title>
          <Link to={`/products/${product._id}`} className="btn">
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
