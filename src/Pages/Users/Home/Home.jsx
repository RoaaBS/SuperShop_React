import React from 'react'
import Category from '../../../Components/User/Category/Category'
import img from '../../../assets/img.jpg'
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import SuperShop from '../../../assets/SuperShop.png'
import { FaGithub } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';


export default function Home() {
  return (
    <div>
<img src={img} style={{ width: '100vw',height:'40vw' }} className='mb-5' />
      <Category/>
      <div className='bg-light h-100 mt-5 ' style={{color:'#030355'}}>
        <h4 className='m-auto d-flex text-center '>Welcome to Super Shop</h4>
        <p className='col-12 col-md-6  mx-auto text-wrap text-center ps-3'>Welcome to Super Shop, your one-stop destination for all your 
        shopping needs! We offer a wide range of products,  
        <b> including the latest mobile phones, essential personal care items, 
        high-quality home and kitchen appliances,</b> as well as a fun collection of toys and
        games for all ages. Shop with us and enjoy a seamless shopping experience with great
         deals and top-notch customer service!</p>
      </div>
      <div className='bg-light h-100 mt-5 m-auto d-flex '>
        <div className='col-md-3'> 
          <img src={SuperShop} alt='supershop logo' style={{width:'200px',height:200}}/>
        </div>
       
        <div className=' col-md-3'>
  <h5 className='pt-4' style={{color:'#030355'}}>LET'S GET <span style={{fontFamily: '"Playwrite IT Moderna", serif',fontWeight: 300}}>Social</span></h5>
  <div style={{ display: "flex" ,flexWrap:'Wrap', alignItems: "center", gap: "10px" }}>
      <a
        href="https://www.linkedin.com/in/roaa-sabbarini/"
        target="_blank"
        rel="noopener noreferrer"
        style={{width: "40px",height: "40px",color: "#0A66C2", fontSize: "24px",}}>
        <FaLinkedin />
      </a>

      <a
        href="mailto:roaa.sabbarini@gmail.com"
        style={{width: "40px",height: "40px",color: "#D14836", fontSize: "24px",}}>
        <SiGmail />
      </a>

      <a
        href="https://github.com/RoaaBS"
        style={{width: "40px",height: "40px",color: "#171515", fontSize: "24px",}}>
        <FaGithub />
      </a>
    </div>
        </div>
        <div className='col-md-3 fs-6 mt-4 text-center'style={{color:'#030355',fontFamily: '"Playwrite IT Moderna", serif',fontWeight: 300}} >
          Created with: <FaHeart /> By Roaa Sabbarini
        </div>
        <div className='col-md-3 text-center'>
          <h5 className='mt-4' style={{color:'#030355'}}>Navigation</h5>
          <ul style={{listStyleType: "none"}}>
            <li> <Link to={'/categories'} style={{ textDecoration: "none", color: "#030355" }}>Category</Link></li>
            <li ><Link s={Link} to={'/products'} style={{ textDecoration: "none", color: "#030355" }}>Products</Link></li>
          </ul>
        </div>
</div>

    </div>
  )
}
