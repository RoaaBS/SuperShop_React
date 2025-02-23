 import React,{useState,useEffect, useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
 import axios from 'axios';
 import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './ProductDetails.module.css';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { toast,Zoom } from 'react-toastify';
import { CartContext } from '../../../Components/User/context/cartContext';
 export default function ProductDetails() {
  const navigate =useNavigate();
  const {cartCount,setcartCount}=useContext(CartContext);
    const {productId}=useParams();
    const [product, setProduct] = useState({});
    const[review,setReview]=useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const getReview=async()=>{
      try{
        const response=await axios.get(`https://ecommerce-node4.onrender.com`)
        setReview([...review, { rating, comment }]);
      }catch(err){
        console.log('Error:', err.response || err.message);
        toast.error('Failed to add review', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Zoom,
        });
      
      }finally {
        setIsLoading(false);
      }
    }
    const addReview = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.post(
          `https://ecommerce-node4.onrender.com/products/${productId}/review`,
          {
            rating: rating, 
            comment: comment, 
            
          },
          { headers: { Authorization: `Tariq__${token}` } }
        );
  
        if (response.status === 201) {
          toast.success('Review added successfully!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            transition: Zoom,
          });
  
       
          setReview([...review, { rating, comment }]);
  
        
          setRating('');
          setComment('');
        }
      } catch (error) {
        console.log('Error:', error.response || error.message);
        toast.error('Failed to add review', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Zoom,
        });
      }
    };
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
        getReview();
      }, []);
    
      if (isLoading) {
        return <h2>Loading..</h2>;
      }
   return (
<div className={`container mt-4`}>
  <div className="row d-flex align-items-start">

    <div className="col-md-3">
      <Card className={styles.card}>
        <Card.Img
          className={styles.cardImgTop}
          variant="top"
          src={product.mainImage?.secure_url}
          alt={product.name}
        />
      </Card>
    </div>


    <div className="col-md-7">
      <Card className={styles.card}>
        <Card.Body className={styles.cardBody}>
          <Card.Title>{product.name}</Card.Title>
          <Card.Title>Price: {product.price}</Card.Title>
          <Card.Title className={styles.discount}>
            Discount: {product.discount}%
          </Card.Title>
          <Card.Title>Stock: {product.stock}</Card.Title>
          <Card.Title>Price After Discount: {product.finalPrice}</Card.Title>

          {/* Review Form */}
          <Form.Group className="mb-3" controlId="formBasicReview">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter rating (1-5)"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
            />
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add your review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
          <Button onClick={addReview} className={styles.sub_btn}>
            Submit
          </Button>
          <Button onClick={addtoCart} className={styles.btn}>
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  </div>


  <h3 className="mt-3">Reviews and Comments</h3>
  <Card className={styles.card}>
    {product.reviews && product.reviews.length > 0 ? (
      product.reviews.slice(0, 10).map((review, index) => (
        <div className="d-flex ms-3 pl-3" key={index}>
          <Card.Title className="ms-4">Rating: {review.rating}</Card.Title>
          <Card.Title className="ms-3">Comment: {review.comment}</Card.Title>
        </div>
      ))
    ) : (
      <Card.Title>No reviews yet</Card.Title>
    )}
  </Card>
</div>

   )
 }
 