import React, { useState } from 'react';
import { Box, Button, Container, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import BookSlider from '../BookSlider/BookSlider';

const BooksCarousel = ({ bookList, title, categories, sx }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const filteredBooks = selectedCategory === '전체' ? bookList : bookList.filter((book) => book.categoryName.includes(selectedCategory));
  const bookGroup = bookList[0]?.queryType;
  const onClickMore = (bookGroup) => {
    navigate(`/books/group/${bookGroup}`);
  };

  return (
    <Container
      sx={{
        ...sx,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        position: 'relative', // Add position relative to ensure proper stacking context
        zIndex: 1, // Ensure zIndex is set properly
      }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          component="div"
          gutterBottom
          sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'left', flexGrow: 1, padding: '5px' }}>
          {title}
        </Typography>
        <Button
          size="large"
          endIcon={<AddCircleOutline />}
          onClick={() => onClickMore(bookGroup)}
          sx={{ justifyContent: 'flex-end', marginLeft: isMobile ? 0 : 'auto' }}>
          더보기
        </Button>
      </Box>
      {!categories ? (
        <BookSlider bookList={bookList} isMobile={isMobile} />
      ) : (
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={selectedCategory}
              onChange={handleCategoryChange}
              aria-label="category tabs"
              allowScrollButtonsMobile
              variant="scrollable"
              indicatorColor="primary"
              textColor="primary"
              scrollButtons="auto">
              {categories.map((category) => (
                <Tab
                  key={category.id}
                  label={category.label}
                  value={category.id}
                  sx={{
                    fontSize: '1rem',
                    '&.Mui-selected': {
                      fontWeight: 'bold',
                      borderBottom: '2px solid #608020',
                      transition: 'border-bottom 0.3s ease',
                    },
                  }}
                />
              ))}
            </Tabs>
          </Box>
          <BookSlider bookList={filteredBooks} />
        </>
      )}
    </Container>
  );
};

export default BooksCarousel;
