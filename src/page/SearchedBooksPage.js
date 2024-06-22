import { useSelector } from 'react-redux';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';
import BookCard from '../components/BookCard';

const SearchedBooksPage = () => {
  const { books } = useSelector((state) => state.book);
  const [searchParams] = useSearchParams();
  const queryKey = searchParams.keys().next().value;
  const queryValue = searchParams.get(queryKey);
  const count = books.length;

  return (
    <Container>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          margin: '4rem',
          color: 'black',
        }}>
        "{queryKey}로 {queryValue}를 검색한 결과 {count}개 입니다."
      </Typography>
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={book.id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SearchedBooksPage;
