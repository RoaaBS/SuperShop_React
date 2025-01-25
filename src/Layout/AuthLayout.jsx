 import React from 'react'
 import CustomeNavbar from "../Components/User/Navbar/Navbar"
 import { Outlet } from 'react-router-dom';
export default function AuthLayout() {
  return (
    <>
      <CustomeNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}




