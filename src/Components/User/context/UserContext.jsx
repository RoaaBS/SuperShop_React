import { createContext, useEffect,useState } from "react";
import axios from 'axios'

export const UserContext =createContext();

 const UserContextProvider=({children})=>{
    const[user,setuser]=useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      getUser();
    }, []);
    
    const getUser = async () => {
      const token = localStorage.getItem('userToken');
      try {
        const response = await axios.get('https://ecommerce-node4.onrender.com/user/profile', {
          headers: { Authorization: `Tariq__${token}` }
        });
        setuser(response.data.user);
      } catch (e) {
        console.log("Fetching user error", e);
        setuser(null);
      } finally {
        setLoading(false);
      }
    };
    

    return <UserContext.Provider value={{user, loading,setuser }}>{children}</UserContext.Provider>;


} 
export default UserContextProvider;