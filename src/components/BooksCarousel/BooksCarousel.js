import { Box, Button, Container, Tab, Tabs, Typography } from '@mui/material';
import BookSlider from '../BookSlider/BookSlider';
import React, { useState } from 'react';
import { AddCircleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const BooksCarousel = ({ bookList, title, categories, sx }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('전체');

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
            // justifyContent: 'space-between',
            flexDirection: 'column',
            borderRadius: 2,
            paddingLeft: '0px',
            paddingRight: '0px',
            marginTop: '60px',
          }}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h3" component="div" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', margin: 0 }}>
                {title}
              </Typography>

              <Button size="large" endIcon={<AddCircleOutline />} onClick={() => onClickMore(bookGroup)} sx={{ justifyContent: 'flex-end' }}>
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
            // justifyContent: 'space-between',
            flexDirection: 'column',
            borderRadius: 2,
            paddingLeft: '0px',
            paddingRight: '0px',
            marginTop: '60px',
          }}>
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center', margin: 0 }}>
                <Typography variant="h3" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {title}
                </Typography>
              </Box>

              <Button size="large" endIcon={<AddCircleOutline />} onClick={() => onClickMore(bookGroup)} sx={{ justifyContent: 'flex-end' }}>
                더보기
              </Button>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '20px' }}>
              <Tabs
                value={selectedCategory}
                onChange={handleCategoryChange}
                aria-label="category tabs"
                allowScrollButtonsMobile
                variant="scrollable" // 탭 너비를 꽉 채우도록 설정
                indicatorColor="primary" // 선택된 탭의 인디케이터 색상 설정
                textColor="primary"
                scrollbuttons="auto">
                // 탭 텍스트 색상 설정
                {categories.map((category) => (
                  <Tab
                    key={category.id}
                    label={category.label}
                    value={category.id}
                    sx={{
                      fontSize: '1rem', // 폰트 사이즈 설정
                      '&.Mui-selected': {
                        fontWeight: 'bold', // 선택된 탭 폰트 볼드 처리
                        borderBottom: '2px solid #608020', // 선택된 탭에 밑줄 스타일
                        transition: 'border-bottom 0.3s ease', // 밑줄에 트랜지션 적용
                      },
                    }}
                  />
                ))}
              </Tabs>
            </Box>
            <BookSlider bookList={filteredBooks} />
          </Box>
        </Container>
      )}
    </>
  );
};

export default BooksCarousel;

// , fontStyle: 'italic'
// variant="outlined"
