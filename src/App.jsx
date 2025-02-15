import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthLayout from './Layout/AuthLayout';
import DashboardLayout from './Layout/DashboardLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import UserLayout from './Layout/UserLayout';
import Home from './Pages/Users/Home/Home';
import Categories from './Pages/Users/Category/Categories';
import Products from './Pages/Users/Products/Products';
import CategoryProduct from './Pages/Users/Products/CategoryProduct';
import ProductDetails from './Pages/Users/Products/ProductDetails';
import Cart from './Pages/Cart/Cart';
import ProtectedRoute from './Components/User/ProtectedRoute';
import CartContextProvider from './Components/User/context/cartContext';
import Profile from './Pages/Users/Profile/Profile';
import Info from './Pages/Users/Profile/Info';
import Orders from './Pages/Users/Profile/Orders';
import  UserContextProvider  from './Components/User/context/UserContext';
import Image from './Pages/Users/Profile/Image';
import Login from './Pages/Users/Login/Login';
import Register from './Pages/Users/Register/Register';
import AuthProtectedRouter from './Components/User/AuthProtectedRouter';
import Forgotpass from './Pages/Users/ForgotPassword/Forgotpass';

function App() {
  const router = createBrowserRouter([
    {
      path: "/auth", // Parent route for authentication-related pages
      element: 
      <AuthProtectedRouter>
        <AuthLayout />
        </AuthProtectedRouter>,
      children: [
        { 
          path: "login",  // Relative path under /auth
          element: <Login />
        },
        {
          path: "register", // Relative path under /auth
          element: <Register />
        },
      ],
    },{
      path:"forgotpassword",
      element:<Forgotpass/>
    },
    {
      path: "/", // Parent route for user-related pages
      element: 
      <UserContextProvider>
      <CartContextProvider>
        <ProtectedRoute>
          <UserLayout />  {/* Ensure Navbar is inside this layout */}
        </ProtectedRoute>
      </CartContextProvider>
    </UserContextProvider>,
    
      children: [
        {
          path: "/", // Home page
          element: <Home />
        },
        {
          path: "categories", // Categories page
          element: <Categories />
        }, 
        {
          path: "categories/:categoryId", // Category Products page
          element: <CategoryProduct />
        },
        {
          path: "products", // Products page
          element: <Products />
        },
        {
          path: "products/:productId", // Product details page
          element: <ProductDetails />
        },
        {
          path: "cart", // Cart page
          element: <Cart />
        },
        {
          path: "profile", // Profile page
          element: <Profile />,
          children: [
            {
              path: "info",
              element: <Info />
            },
            {
              path: "orders",
              element: <Orders />
            },
            {
              path: "image",
              element: <Image />
            },
          ]
        },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />
    }
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
