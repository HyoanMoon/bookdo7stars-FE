import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { bookActions } from '../action/bookActions';
import NotFoundPage from './NotFoundPage';
import SlideBanner from '../components/SlideBanner';

const MainPage = () => {
  const dispatch = useDispatch();
  const { books, bookGroup, categoryBooks } = useSelector((state) => state.book);
  const { selectedCategory } = useSelector((state) => state.category);
  const [query] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    title: query.get('title') || '',
    author: query.get('author') || '',
    bookGroup: bookGroup || '',
    isbn: query.get('isbn') || '',
  });
  useEffect(() => {
    dispatch(bookActions.getBookList({ ...searchQuery }));
  }, [searchQuery]);

  console.log(selectedCategory);
  useEffect(() => {
    if (selectedCategory) {
      console.log('das sollte ausgeführt werden');
      dispatch(bookActions.getBookListByCategory({ ...searchQuery }, selectedCategory.categoryId));
    }
  }, [searchQuery, selectedCategory]);

  if (!books) {
    return;
  }

  const bestRankedBooks = [];
  books.map((book) => {
    if (book.customerReviewRank > 8) {
      bestRankedBooks.push(book);
    }
  });
  const topBestRankedBooks = bestRankedBooks.slice(0, 10);
  console.log('categoryBooks', categoryBooks);

  let toBeShowedBooks;
  if (!selectedCategory) {
    toBeShowedBooks = books;
  } else {
    toBeShowedBooks = categoryBooks;
  }

  return (
    <Container sx={{ width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <SlideBanner books={topBestRankedBooks} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap', // 카드가 화면을 벗어나지 않도록 줄바꿈
          gap: '10px',
          marginTop: '100px',
        }}>
        {toBeShowedBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </Container>
  );
};
export default MainPage;
