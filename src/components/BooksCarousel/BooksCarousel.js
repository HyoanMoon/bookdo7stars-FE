import { Box, Button, Container, Typography } from '@mui/material';
import BookSlider from '../BookSlider/BookSlider';
import React from 'react';
import { AddCircleOutline } from '@mui/icons-material';

const BooksCarousel = ({ books, title, sx }) => {
  return (
    <Container
      sx={{ ...sx, width: '100%', marginTop: '50px', height: '550px', display: 'flex', justifyContent: 'center', flexDirection: 'column', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography
          variant="h3"
          component="div"
          gutterBottom
          sx={{ fontWeight: 'bold', fontStyle: 'italic', marginTop: '50px', display: 'flex', alignItems: 'center' }}>
          {title}
        </Typography>
        <Button variant="outlined" size="large" endIcon={<AddCircleOutline />}>
          더보기
        </Button>
      </Box>
      <BookSlider books={books} />
    </Container>
  );
};

export default BooksCarousel;
