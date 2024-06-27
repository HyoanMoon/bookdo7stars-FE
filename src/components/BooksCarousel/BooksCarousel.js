import React, { useState } from 'react';
import { Box, Button, Container, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import BookSlider from '../BookSlider/BookSlider';

const BooksCarousel = ({ bookList, title, categories, sx }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const isMobile = useMediaQuery('(max-width: 600px)'); // 모바일 화면 크기 확인

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const filteredBooks = selectedCategory === '전체' ? bookList : bookList.filter((book) => book.categoryName.includes(selectedCategory));
  const bookGroup = bookList[0]?.queryType;
  const onClickMore = (bookGroup) => {
    navigate(`/books/group/${bookGroup}`);
  };

  return (
    <>
      {!categories ? (
        <Container
          sx={{
            ...sx,
            width: '100%',
            height: '50vh',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            // paddingLeft: '0px',
            // paddingRight: '0px',
            // marginTop: '60px',
          }}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography
                variant={isMobile ? 'h4' : 'h3'}
                component="div"
                gutterBottom
                sx={{ fontWeight: 'bold', display: 'flex', margin: 0, justifyContent: 'left', flexGrow: 1, padding: '5px' }}>
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
            <BookSlider bookList={bookList} />
          </Box>
        </Container>
      ) : (
        <Container
          sx={{
            ...sx,
            width: '100%',
            height: '60vh',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            // paddingLeft: '0px',
            // paddingRight: '0px',
            // marginTop: '60px',
          }}>
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'left', flexGrow: 1 }}>
                <Typography
                  variant={isMobile ? 'h4' : 'h3'}
                  component="div"
                  gutterBottom
                  sx={{ fontWeight: 'bold', display: 'flex', margin: 0, justifyContent: 'left', flexGrow: 1, padding: '5px' }}>
                  {title}
                </Typography>
              </Box>
              <Button
                size="large"
                endIcon={<AddCircleOutline />}
                onClick={() => onClickMore(bookGroup)}
                sx={{ justifyContent: 'flex-end', marginLeft: isMobile ? 0 : 'auto' }}>
                더보기
              </Button>
            </Box>

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
            <Box sx={{ pt: 2, pb: 2 }}>
              <BookSlider bookList={filteredBooks} />
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default BooksCarousel;
