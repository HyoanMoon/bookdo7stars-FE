import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../components/context/bookStore/bookStoreSlice';
import { useSearchParams } from 'react-router-dom';

const MainPage = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((store) => store.bookStore);
  const [query] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    name: query.get('name') || '',
  });

  useEffect(() => {
    dispatch(fetchBooks({ ...searchQuery }));
  }, [searchQuery]);

  return (
    <Container sx={{ width: '100wh', backgroundColor: 'blue' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap', // 카드가 화면을 벗어나지 않도록 줄바꿈
          gap: '10px',
          padding: '10px',
        }}>
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </Container>
  );
};
export default MainPage;
