import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import BooksAllContainer from './BooksAllContainer';

const BooksAllPage = () => {
  const { books } = useSelector((state) => state.book);

  if (!books) {
    return;
  }
  return (
    <Container sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box sx={{ marginBottom: '50px', marginTop: '10px' }}>
        <BooksAllContainer books={books} title="전체 도서" />
      </Box>
    </Container>
  );
};
export default BooksAllPage;

//backgroundColor: 'primary.light'
