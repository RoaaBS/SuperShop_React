import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get('https://ecommerce-node4.onrender.com/cart', {
        headers: { Authorization: `Tariq__${token}`, },
      });
      setCartCount(response.data.count);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
