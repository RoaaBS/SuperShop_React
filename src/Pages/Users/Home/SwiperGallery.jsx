import React, { useState, useEffect } from 'react';
import img from '../../../assets/img.jpg';
import img2 from '../../../assets/img2.jpg';
import img3 from '../../../assets/img3.jpg';


const SwiperGallery = ({ autoplay, pauseOnHover }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [img, img2, img3,];

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 6000); 
    }

    return () => clearInterval(interval); 
  }, [autoplay]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      clearInterval(interval); 
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 6000);
    }
  };

  return (
    <div
      className="rolling-gallery"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={images[currentImageIndex]}
        alt={`Gallery Image ${currentImageIndex + 1}`}
        style={{ width: '100%', height: '500px', transition: 'transform 5s ease' }}
      />
    </div>
  );
};

export default SwiperGallery;
