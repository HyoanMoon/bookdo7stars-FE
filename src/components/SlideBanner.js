import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slideBanner.css';
import Box from '@mui/material/Box';

const SlideBanner = ({ books }) => {
  const settings = {
    className: 'center',
    center: true,
    dots: true,
    infinite: true,
    speed: 500,
    centerPadding: '60px',
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="slider-container" style={{ backgroundColor: '#608020', width: '100%' }}>
      <Slider {...settings}>
        {books.map((book, index) => (
          <div key={index}>
            <Box>
              <img src={book.cover} alt={book.title} style={{ width: '100%', height: '300px', objectFit: 'contain' }} />
            </Box>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlideBanner;
