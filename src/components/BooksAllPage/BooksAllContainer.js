import { Box, Container, Grid, Typography, IconButton, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteActions } from '../../action/favoriteActions';

const BooksAllContainer = ({ bookList, title }) => {
  const [page, setPage] = useState(1);
  const booksPerPage = 50;
  const dispatch = useDispatch();
  const { favorite } = useSelector((state) => state.favorite);
  const { user } = useSelector((state) => state.favorite);

  useEffect(() => {
    dispatch(favoriteActions.getFavorite());
  }, [dispatch, user]);

  // 총 페이지 수 계산
  const pageCount = Math.ceil(bookList.length / booksPerPage);

  // 현재 페이지에 해당하는 책들
  const displayedBooks = bookList.slice((page - 1) * booksPerPage, page * booksPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleTop50Click = () => {
    setPage(1); // 첫 번째 페이지로 이동
  };

  const handleTop100Click = () => {
    setPage(3); // 세 번째 페이지로 이동 (50 * 2 = 100)
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 2,
        paddingLeft: '0px',
        paddingRight: '0px',
        marginTop: '20px', // 페이지네이션과의 간격 조정
      }}>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <Typography variant="h3" component="div" gutterBottom sx={{ width: '400px', height: '60px', fontWeight: 'bold', textAlign: 'center', margin: '0px' }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
        <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <IconButton onClick={handleTop50Click} color={page === 1 ? 'primary' : 'default'}>
            <Typography variant="body1">Top 50</Typography>
          </IconButton>
          <IconButton onClick={handleTop100Click} color={page === 3 ? 'primary' : 'default'}>
            <Typography variant="body1">Top 100</Typography>
          </IconButton>
        </Box>
        <Box sx={{ marginTop: '10px' }}>
          <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" showFirstButton showLastButton />
        </Box>
        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {displayedBooks.map((book) => (
            <Grid
              key={book._id}
              item
              xs={12}
              sm={8}
              md={6}
              lg={4}
              sx={{ paddingY: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <BookCard key={book._id} book={book} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default BooksAllContainer;
