import React, { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bookActions } from '../action/bookActions';
import CategoryList from './CategoryList/CategoryList';
import BooksGroupContainer from './BooksGroupPage/BooksGroupContainer';
const CategoryPage = () => {
  const dispatch = useDispatch();
  const { books, categoryBooks } = useSelector((state) => state.book);
  const { selectedCategoryPath } = useSelector((state) => state.category);
  const [category, setCategory] = useState('국내도서');
  const [isCategoryItemClicked, setIsCategoryItemClicked] = useState(false);
  const params = useParams();
  const totalCategories = [];
  books.map((book) => {
    return totalCategories.push(book.categoryName);
  });

  useEffect(() => {
    if (params.categoryid) {
      dispatch(bookActions.getBookListByCategory(params.categoryid));
      setIsCategoryItemClicked(false);
    }
  }, [params.categoryid]);

  if (!books) {
    return;
  }
  if (!categoryBooks) {
    return;
  }

  const onCategoryClick = (categoryPath) => {
    setIsCategoryItemClicked(true);
    setCategory(categoryPath);
  };

  let booksByCategory = [];
  if (selectedCategoryPath && !isCategoryItemClicked) {
    books.map((book) => {
      if (book.categoryName.includes(selectedCategoryPath)) {
        booksByCategory.push(book);
      }
    });
  }
  if (isCategoryItemClicked || selectedCategoryPath) {
    books.map((book) => {
      if (book.categoryName.includes(category)) {
        booksByCategory.push(book);
      }
    });
  }

  let title;
  if (booksByCategory.length !== 0) {
    title = category;
  }
  if (categoryBooks.length !== 0) {
    title = selectedCategoryPath;
  }

  if (booksByCategory.length === 0 && categoryBooks.length === 0) {
    title = '해당 카테고리에는 책이 없습니다.';
  }
  console.log('title', title);

  return (
    <Container
      sx={{
        maxWidth: '100%',
        '@media (min-width: 800)': {
          maxWidth: '1000px',
          margin: 'auto', // 화면 너비가 800 이상일 때 적용
        },
        '@media (min-width: 1000px)': {
          maxWidth: '1200px',
          margin: 'auto', // 화면 너비가 1000px 이상일 때 적용
        },
        '@media (min-width: 1200px)': {
          maxWidth: '1400px',
          margin: 'auto', // 화면 너비가 1200px 이상일 때 적용
        },
        '@media (min-width: 1400px)': {
          maxWidth: '1600px', // 화면 너비가 1200px 이상일 때 적용
        },
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 2,
        padding: 0,
        margin: 'auto',
      }}>
      <Grid container spacing={2}>
        {/* 왼쪽 칼럼 (2:10 비율) */}
        <Grid item xs={2}>
          <Box>
            <CategoryList totalCategories={totalCategories} onCategoryClick={onCategoryClick} groupName={''} />
          </Box>
        </Grid>

        {/* 오른쪽 칼럼 (2:10 비율) */}
        <Grid item xs={10}>
          <Box>
            <BooksGroupContainer books={selectedCategoryPath ? booksByCategory : categoryBooks} title={title} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
export default CategoryPage;

//backgroundColor: 'primary.light'
