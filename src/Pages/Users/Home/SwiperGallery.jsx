import React, { useState, useEffect } from 'react';
import img from '../../../assets/img.jpg';
import img2 from '../../../assets/img2.jpg';
import img3 from '../../../assets/img3.jpg';

const SwiperGallery = ({ autoplay }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [img, img2, img3];

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 6000);
    }

    return () => clearInterval(interval); 
  }, [autoplay]);

  return (
    <div className="rolling-gallery">
      <img
        src={images[currentImageIndex]}
        alt={`Gallery Image ${currentImageIndex + 1}`}
        style={{ width: '100%', height: '500px' }}
      />
    </div>
  );
};

export default SwiperGallery;
