import { Container, Typography } from '@mui/material';
import BookSlider from '../BookSlider/BookSlider';
import React from 'react';

const SpecialNewBooks = ({ books, sx }) => {
  return (
    <Container sx={{ ...sx, width: '100%', marginTop: '50px', height: '550px' }}>
      <Typography variant="h3" component="div" gutterBottom sx={{ fontWeight: 'bold', fontStyle: 'italic', marginTop: '50px' }}>
        화제의 신간
      </Typography>
      <BookSlider books={books} />
    </Container>
  );
};

export default SpecialNewBooks;
