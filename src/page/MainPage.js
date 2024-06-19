import React from 'react';
import BookCard from '../components/BookCard';
import { Container } from '@mui/material';

const MainPage = () => {
  const books = [
    {
      _id: 'xxx',
      isbn: 'K502931817',
      title: '2025 강해준 경찰학 기본서 세트 - 전2권',
      author: '강해준 (지은이)',
      description: '',
      pubDate: '2024-06-18',
      cover: 'https://image.aladin.co.kr/product/34163/3/coversum/k502931817_1.jpg',
      stockStatus: '예약판매',
      categoryId: '140201',
      categoryName: '국내도서>수험서/자격증>공무원 수험서>경찰공무원(승진)>경찰학개론',
      publisher: '단아한',
      adult: false,
      priceStandard: 46000,
    },
    {
      _id: 'yyy',
      isbn: 'K502931817',
      title: '2025 강해준 경찰학 기본서 세트 - 전2권',
      author: '강해준 (지은이)',
      description: '',
      pubDate: '2024-06-18',
      cover: 'https://image.aladin.co.kr/product/34163/3/coversum/k502931817_1.jpg',
      stockStatus: '예약판매',
      categoryId: '140201',
      categoryName: '국내도서>수험서/자격증>공무원 수험서>경찰공무원(승진)>경찰학개론',
      publisher: '단아한',
      adult: false,
      priceStandard: 46000,
    },
  ];

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
