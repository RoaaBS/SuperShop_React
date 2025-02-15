import React from 'react'
import Category from '../../../Components/User/Category/Category'
export default function Home() {
  return (
    <div>
      <Category/>
      <div className='bg-light h-100 mt-5'>
        <h4>Welcome to Super Shop</h4>
        <p className='ps-5  m-auto text-center  w-50'>Welcome to Super Shop, your one-stop destination for all your 
        shopping needs! We offer a wide range of products,  
        <b> including the latest mobile phones, essential personal care items, 
        high-quality home and kitchen appliances,</b> as well as a fun collection of toys and
        games for all ages. Shop with us and enjoy a seamless shopping experience with great
         deals and top-notch customer service!</p>
      </div>
    </div>
  )
}
