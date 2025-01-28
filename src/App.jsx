import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AuthLayout from './Layout/AuthLayout'
import DashboardLayout from './Layout/DashboardLayout'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Pages/Users/Login/Login'
import Register from './Pages/Users/Register/Register'
import { ToastContainer } from 'react-toastify';
import UserLayout from './Layout/UserLayout'
import Home from './Pages/Users/Home/Home'
import Categories from './Pages/Users/Category/Categories'
import Products from './Pages/Users/Products/Products'
import CategoryProduct from './Pages/Users/Products/CategoryProduct'
import ProductDetails from './Pages/Users/Products/ProductDetails'

function App() {
  const router = createBrowserRouter([
    {
      path: "/auth", // Parent route for authentication-related pages
      element: <AuthLayout />,
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
    },
    {
      path: "/", // Parent route for user-related pages
      element: <UserLayout />,
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
          path: "categories/:categoryId", // Categories page
          element: <CategoryProduct />
        },
        {
          path: "Products", // Products page
          element: <Products />
        },
        {
          path: "Products/:productId", // Products page
          element: <ProductDetails />
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
