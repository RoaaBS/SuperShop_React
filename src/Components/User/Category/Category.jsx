 import React from 'react'
 import axios from 'axios';
import  { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import styles from './Category.module.css'
 export default function Category() {
    const [categories, setCategories] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = async () => {
    try {
      const { data } = await axios.get('https://ecommerce-node4.onrender.com/categories');
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) {
    return <h2>Loading..</h2>;
  }

   return (
     
    <Swiper
    modules={[Navigation]}
      spaceBetween={5}
      slidesPerView={3.5}
      navigation
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {categories.map(Category=>
      <SwiperSlide key={Category._id}> <img src={Category.image.secure_url} className={styles.home}/></SwiperSlide>
      )}
     
 
    </Swiper>
     
   )
 }
 