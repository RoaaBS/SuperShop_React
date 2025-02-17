import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';


export default function ViewOrders() {
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getOrder = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get("https://ecommerce-node4.onrender.com/order", {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      console.log("fetch order successfully", response.data.orders);
      setOrder( response.data.orders );
    } catch (error) {
      console.log("Can't get Order", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);


  return (
    <div className='ms-5'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
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
            {order.length > 0 ? (
              order.map((order, orderIndex) =>
              <React.Fragment key={orderIndex}>
               {order.products.map((product, productIndex) => (
                  <tr key={`${orderIndex}-${productIndex}`}>
                    <td>
                      <img
                        src={product.productId?.mainImage?.secure_url}
                        width="50px"
                        alt={product.productId?.name}
                      />
                    </td>
                    <td>{product.productId?.name}</td>
                    <td>{product.unitPrice}$</td>
                    <td>{product.quantity}</td>
                    <td>{product.finalPrice}$</td>
                  </tr>
                  ))}
                  <tr style={{backgroundColor:"#f8f8f8", fontWeight: "bold"}}>
                    <td colSpan="5">Status: {order.status}</td>
                  </tr>
                     <tr style={{ backgroundColor: "#f8f8f8", fontWeight: "bold" }}>
                    <td colSpan="4">Total Order Price:</td>
                    <td colSpan="1">{order.finalPrice}$</td>
                  </tr>
            
                  </React.Fragment>
                )
            ) : (
              <tr>
                <td colSpan="5">No orders found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
}