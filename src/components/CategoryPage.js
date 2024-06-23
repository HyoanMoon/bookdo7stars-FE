import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { bookActions } from '../action/bookActions';
import BooksCategoryContainer from './BooksCategoryPage/BooksCategoryContainer';
import { getCategoryHierarchy } from '../_helper/getCategoryHierarchy';
import { getSubCategories } from '../_helper/getSubCategories';
const CategoryPage = () => {
  const dispatch = useDispatch();
  const { books, categoryBooks } = useSelector((state) => state.book);
  const { categories } = useSelector((state) => state.category);
  const categoryId = useParams();
  const category = categories.find((cat) => {
    return cat.categoryId === categoryId.categoryid;
  });

  useEffect(() => {
    if (categoryId) {
      dispatch(bookActions.getBookListByCategory(categoryId.categoryid));
    }
  }, [categoryId]);

  if (!categoryBooks || !categoryId) {
    return;
  }

  return (
    <>
      <Container sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{ marginBottom: '50px', marginTop: '10px' }}>
          <BooksCategoryContainer books={categoryBooks} title={category.categoryName} moreButtonShowed={false} />
        </Box>
      </Container>
      {/* <Footer /> */}
    </>
  );
};
export default CategoryPage;

//backgroundColor: 'primary.light'
