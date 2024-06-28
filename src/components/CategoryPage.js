import React, { useEffect, useState, useCallback } from 'react';
import { Box, Container, Drawer, Grid, IconButton, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { bookActions } from '../action/bookActions';
import CategoryList from './CategoryList/CategoryList';
import BooksGroupContainer from './BooksGroupPage/BooksGroupContainer';
import MenuIcon from '@mui/icons-material/Menu';
import { useParams, useNavigate } from 'react-router-dom';

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { bookList } = useSelector((state) => state.book);
  const [category, setCategory] = useState('국내도서');
  const navigate = useNavigate();
  const encodeCategoryPath = (path) => encodeURIComponent(path);
  const [selectedPath, setSelectedPath] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const totalCategories = [];
  const isMobile = useMediaQuery('(max-width: 600px)');

  const params = useParams();

  bookList.map((book) => {
    return totalCategories.push(book.categoryName);
  });

  useEffect(() => {
    if (/^\d+$/.test(params.categoryid)) {
      dispatch(bookActions.getBookListByCategory(params.categoryid));
    }
  }, [params.categoryid, dispatch]);

  const onCategoryClick = useCallback(
    (categoryPath) => {
      setCategory(categoryPath);
      const categoryid = encodeCategoryPath(categoryPath);
      navigate(`/books/all/category/${categoryid}`);
      if (isMobile) {
        setIsDrawerOpen(false);
      }
    },
    [navigate, isMobile],
  );

  const booksByCategory = bookList.filter((book) => book.categoryName.includes(params.categoryid));
  const title = params.categoryid + ` (${booksByCategory.length})`;

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  if (!bookList || !booksByCategory) {
    return null;
  }

  return (
    <Container
      sx={{
        maxWidth: '100%',
        '@media (min-width: 800px)': {
          maxWidth: '1000px',
          margin: 'auto',
        },
        '@media (min-width: 1000px)': {
          maxWidth: '1200px',
          margin: 'auto',
        },
        '@media (min-width: 1200px)': {
          maxWidth: '1400px',
          margin: 'auto',
        },
        '@media (min-width: 1400px)': {
          maxWidth: '1600px',
        },
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 2,
        padding: 0,
        margin: 'auto',
      }}>
      <Grid container spacing={2}>
        {!isMobile && (
          <Grid item xs={2}>
            <Box>
              <CategoryList totalCategories={totalCategories} onCategoryClick={onCategoryClick} setSelectedPath={setSelectedPath} />
            </Box>
          </Grid>
        )}
        {isMobile && (
          <>
            <Box sx={{ marginLeft: '10px', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={toggleDrawer(true)} color="primary" aria-label="filter">
                <MenuIcon />
              </IconButton>
              <Box sx={{ overflowX: 'auto', whiteSpace: 'nowrap', marginLeft: '10px' }}>
                {selectedPath.map((pathItem, index) => (
                  <span key={index}>
                    <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setSelectedPath(selectedPath.slice(0, index + 1))}>
                      {pathItem}
                    </span>
                    {index < selectedPath.length - 1 && ' > '}
                  </span>
                ))}
              </Box>
            </Box>
            <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
              <CategoryList totalCategories={totalCategories} onCategoryClick={onCategoryClick} setSelectedPath={setSelectedPath} />
            </Drawer>
          </>
        )}
        <Grid item xs={12} sm={10}>
          <Box>
            <BooksGroupContainer bookList={booksByCategory} title={title} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CategoryPage;
