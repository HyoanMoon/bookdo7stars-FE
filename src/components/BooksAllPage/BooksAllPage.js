import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import BooksAllContainer from './BooksAllContainer';

const BooksAllPage = () => {
  const { bookList } = useSelector((state) => state.book);

  if (!bookList) {
    return;
  }
  return (
    <Container sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box sx={{ marginBottom: '50px', marginTop: '10px' }}>
        <BooksAllContainer bookList={bookList} title="전체 도서" />
      </Box>
    </Container>
  );
};
export default BooksAllPage;

//backgroundColor: 'primary.light'
