import React,{useState} from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
export default function ViewOrders() {
  const cart = location.state?.cart ?? []; 
  const [Order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getOrder =async()=>{
    setIsLoading(true);
    try{
      const token=localStorage.getItem("userToken");
      const response =await axios.get('localhost:3000/order',{
        headers:{
          Authorization: `Tariq__${token}`,
        }
      })
      setOrder(response.data);
    }catch(error){
      console.log("Can't get Order",error);
    }finally{
      setIsLoading(false)
    }
    useEffect(() => {
      getOrder();
    }, []);
  }
  return (
    <div className='ms-5'>
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
        {cart.map((item)=>{
          <tr><td>
          <img src={item.details.mainImage.secure_url} width="50px" alt={item.details.name} />
        </td>
        <td>{item.details.name}</td>
        <td>{item.details.finalPrice}&</td>
        <td>{item.quantity}</td>
        <td>{item.quantity * item.details.finalPrice}$</td>
          </tr>

        })}
        
     
      </tbody>
    </Table>
    </div>
  )
}





