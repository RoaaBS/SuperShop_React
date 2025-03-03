import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import styles from './Category.module.css';
import { Link } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
export default function Category() {
  const [categories, setCategories] = useState([]);
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
    return( <div className='d-flex justify-content-center align-item-center vh-100'>
    <SpinnerCircular speed={100} size={60} thickness={100} color='blue' secondaryColor='lightgray' />

</div>)
  }

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={5}
      slidesPerView={3.5}
      navigation
    >
      {categories.map((category) => (
        <SwiperSlide key={category._id}>
          <Link to={`/categories/${category._id}`}>
            <img
              src={category.image?.secure_url}
              alt={category.name}
              className={styles.home}
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
