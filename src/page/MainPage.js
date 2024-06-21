import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { bookActions } from '../action/bookActions';
import NotFoundPage from './NotFoundPage';
import SlideBanner from '../components/SlideBanner/SlideBanner';
import SpecialNewBooks from '../components/SpecialNewBooks/SpecialNewBooks';
import BestSeller from '../components/Bestseller/BestSeller';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { books, bookGroup, categoryBooks } = useSelector((state) => state.book);
  const { selectedCategory } = useSelector((state) => state.category);

  const fields = ['isbn', 'title', 'author', 'category', 'publisher'];
  const [selectedField, setSelectedField] = useState(fields[0]);
  const [query] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    title: query.get('title') || '',
    author: query.get('author') || '',
    isbn: query.get('isbn') || '',
    publisher: query.get('publisher') || '',
  });
  const handleChange = (event) => {
    event.preventDefault();
    setSelectedField(event.target.value);
  };
  const resetSearch = () => {
    setSearchQuery({});
  };
  useEffect(() => {
    resetSearch();
  }, []);

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

  const bestSeller = books.filter((book) => {
    return book.queryType === 'BlogBest';
  });

  const bestSellerCategory = bestSeller.map((book) => {
    return book.categoryName.split('>')[1];
  });
  const bestSellerCat = [];
  bestSellerCategory.map((cat) => {
    if (!bestSellerCat.includes(cat)) {
      bestSellerCat.push(cat);
    }
  });
  const bestSellerCategories = [];
  const all = { id: '전체', label: '전체' };
  bestSellerCategories.push(all);
  bestSellerCat.map((c) => {
    const cat = { id: c, label: c };
    return bestSellerCategories.push(cat);
  });

  console.log(bestSellerCategories);

  return (
    <Container sx={{ width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <SlideBanner books={topBestRankedBooks} />
      <SpecialNewBooks books={toBeShowedBooks.slice(0, 10)} sx={{ backgroundColor: 'primary.light' }} />
      <BestSeller books={bestSeller} categories={bestSellerCategories} sx={{ height: 500 }} />
      {/*<div*/}
      {/*  style={{*/}
      {/*    display: 'flex',*/}
      {/*    flexDirection: 'row',*/}
      {/*    justifyContent: 'space-around',*/}
      {/*    flexWrap: 'wrap', // 카드가 화면을 벗어나지 않도록 줄바꿈*/}
      {/*    gap: '10px',*/}
      {/*    marginTop: '100px',*/}
      {/*  }}>*/}
      {/*  {toBeShowedBooks.map((book) => (*/}
      {/*    <BookCard key={book._id} book={book} />*/}
      {/*  ))}*/}
      {/*</div>*/}
    </Container>
  );
};
export default MainPage;
