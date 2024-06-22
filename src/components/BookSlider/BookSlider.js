import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import BookCard from '../BookCard';
// eslint-disable-next-line import/no-extraneous-dependencies
import Carousel from 'react-multi-carousel';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-multi-carousel/lib/styles.css';
import './BookSlider.css';
import CustomRightArrow from './CustomRightArrow';
import CustomLeftArrow from './CustomLeftArrow';
const BookSlider = ({ books }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Box sx={{ mt: 2, height: '300px' }}>
      <Carousel containerClass="carousel-container" responsive={responsive} customLeftArrow={<CustomLeftArrow />} customRightArrow={<CustomRightArrow />}>
        {books.map((book, index) => (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
            <BookCard book={book} />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};
export default BookSlider;
