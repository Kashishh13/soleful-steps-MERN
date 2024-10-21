// ImageSwiper.jsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSwiper = () => {
  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    
  };

  const images = [
    'https://img.freepik.com/free-photo/woman-legs-pink-pants-up-air_53876-166985.jpg?ga=GA1.1.757470498.1727537539&semt=ais_hybrid',
    'https://img.freepik.com/free-photo/still-life-say-no-fast-fashion_23-2149669599.jpg?ga=GA1.1.757470498.1727537539&semt=ais_hybrid',
    'https://img.freepik.com/free-photo/view-soccer-shoes_23-2150887398.jpg?ga=GA1.1.757470498.1727537539&semt=ais_hybrid',
    'https://img.freepik.com/free-photo/still-life-say-no-fast-fashion_23-2149669600.jpg?ga=GA1.1.757470498.1727537539&semt=ais_hybrid',
   
  ];

  return (
    <div className="image-swiper">
      <Slider {...settings}>
      {images.map((image, index) => (
          <div key={index} className="slide">
            <img src={image} alt={`Slide ${index + 1}`} height={500} width={1400}/>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSwiper; // This should be a default export
