import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Tabs, Tab, Box, Typography, TextField, Button } from '@mui/material';
import './Info3.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Info3 = () => {
  const [activeTab, setActiveTab] = useState('bookInfo');
  const [review, setReview] = useState('');
  const bookInfoRef = useRef(null);
  const reviewsRef = useRef(null);
  const deliveryRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();
  const section = query.get('section');

  const handleScroll = () => {
    const bookInfoTop = bookInfoRef.current.getBoundingClientRect().top + window.scrollY;
    const reviewsTop = reviewsRef.current.getBoundingClientRect().top + window.scrollY;
    const deliveryTop = deliveryRef.current.getBoundingClientRect().top + window.scrollY;

    if (window.scrollY >= deliveryTop - 50) {
      setActiveTab('delivery');
      navigate({ search: '?section=delivery' }, { replace: true });
    } else if (window.scrollY >= reviewsTop - 50) {
      setActiveTab('reviews');
      navigate({ search: '?section=reviews' }, { replace: true });
    } else if (window.scrollY >= bookInfoTop - 50) {
      setActiveTab('bookInfo');
      navigate({ search: '?section=bookInfo' }, { replace: true });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (section) {
      setActiveTab(section);
      document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
    }
  }, [section]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    document.getElementById(newValue).scrollIntoView({ behavior: 'smooth' });
    navigate({ search: `?section=${newValue}` }, { replace: true });
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    // Handle review submission logic here
    console.log('Review submitted:', review);
    setReview(''); // Clear the form
  };

  return (
    <Container>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        indicatorColor="primary"
        textColor="primary"
        sx={{ backgroundColor: 'white', position: 'sticky', top: '0' }}>
        <Tab label="도서정보" value="bookInfo" />
        <Tab label="리뷰" value="reviews" />
        <Tab label="배송" value="delivery" />
      </Tabs>

      <Box id="bookInfo" my={4} ref={bookInfoRef}>
        <Typography variant="h4">도서정보</Typography>
        <Typography variant="body1">
          {/* 도서 설명을 여기에 넣습니다 */}이 책은 타이틀에 대한 설명이 들어가는 곳입니다. 문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아
        </Typography>
      </Box>

      <Box id="reviews" my={4} ref={reviewsRef}>
        <Typography variant="h4">리뷰</Typography>
        <form onSubmit={handleReviewSubmit}>
          <TextField label="Write a review" multiline rows={4} variant="outlined" fullWidth value={review} onChange={(e) => setReview(e.target.value)} />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: 16 }}>
            Submit Review
          </Button>
        </form>
      </Box>

      <Box id="delivery" my={4} ref={deliveryRef}>
        <Typography variant="h4">배송</Typography>
        <Typography variant="body1">
          {/* 배송 정보를 여기에 넣습니다 */}이 섹션에는 배송 정보가 들어갑니다. 이 책은 타이틀에 대한 설명이 들어가는 곳입니다. 문제는 도서정보나 배송정보가
          내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이
          길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가
          않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가
          않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가
          않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아이 책은 타이틀에 대한 설명이 들어가는 곳입니다.
          문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는
          도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는
          도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는
          도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는
          도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아이 책은 타이틀에
          대한 설명이 들어가는 곳입니다. 문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아이 책은 타이틀에 대한 설명이 들어가는 곳입니다. 문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아이 책은 타이틀에 대한 설명이 들어가는 곳입니다. 문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는
          도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는
          도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아이 책은 타이틀에 대한 설명이 들어가는 곳입니다. 문제는
          도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는
          도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나
          배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아이 책은 타이틀에 대한
          설명이 들어가는 곳입니다. 문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가
          내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가이 길지가
          않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가
          않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아이
          책은 타이틀에 대한 설명이 들어가는 곳입니다. 문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는
          도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는 도서정보나 배송정보가 내용이 길지가 않아문제는
          도서정보나 배송정보가
        </Typography>
      </Box>
    </Container>
  );
};

export default Info3;
