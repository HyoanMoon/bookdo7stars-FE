import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TableContainer, TableBody, Table, TableRow, TableCell, Paper, Container, Tabs, Tab, Box, Typography } from '@mui/material';
import CommentSection from './CommentSection';
import { bookActions } from '../../action/bookActions';
import { commentActions } from '../../action/commentAction';
import { useDispatch, useSelector } from 'react-redux';

import './Info3.css';
import DeliveryPolicy from './DeliveryPolicy';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Info3 = ({ selectedBook }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('bookInfo');
  const comments = useSelector((state) => state.comment?.comments || []);
  const user = useSelector((state) => state.user?.currentUser);
  const bookInfoRef = useRef(null);
  const authorRef = useRef(null);
  const reviewsRef = useRef(null);
  const deliveryRef = useRef(null);
  const navigate = useNavigate();
  const query = useQuery();
  const section = query.get('section');

  const handleScroll = () => {
    const bookInfoTop = bookInfoRef.current ? bookInfoRef.current.getBoundingClientRect().top + window.scrollY : 0;
    const authorTop = authorRef.current ? authorRef.current.getBoundingClientRect().top + window.scrollY : 0;
    const reviewsTop = reviewsRef.current ? reviewsRef.current.getBoundingClientRect().top + window.scrollY : 0;
    const deliveryTop = deliveryRef.current ? deliveryRef.current.getBoundingClientRect().top + window.scrollY : 0;

    const handleScroll = () => {
      if (window.scrollY >= deliveryTop - 50) {
        setActiveTab('delivery');
        navigate({ search: '?section=delivery' }, { replace: true });
      } else if (window.scrollY >= authorTop - 50) {
        setActiveTab('author');
        navigate({ search: '?section=author' }, { replace: true });
      } else if (window.scrollY >= reviewsTop - 50) {
        setActiveTab('reviews');
        navigate({ search: '?section=reviews' }, { replace: true });
      } else if (window.scrollY >= bookInfoTop - 50) {
        setActiveTab('bookInfo');
        navigate({ search: '?section=bookInfo' }, { replace: true });
      }
    };
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

  useEffect(() => {
    if (id) {
      dispatch(bookActions.getBookDetail(id));
      dispatch(commentActions.getCommentsByProduct(id));
    }
  }, [id, dispatch]);

  const addComment = (comment) => {
    console.log('[commentSection에서 받아와서 Info3의 addComment안] 코멘트 submit클릭하면: ', comment);
    if (!user) {
      navigate('/login');
      return;
    }

    dispatch(commentActions.createComment({ content: comment, productId: id }));
  };

  const deleteComment = (commentId) => {
    dispatch(commentActions.deleteComment(commentId, id));
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        indicatorColor="primary"
        textColor="primary"
        sx={{ backgroundColor: '#DADFCE', opacity: '70%', position: 'sticky', top: '0', ml: '0', width: '100%', height: '5rem' }}>
        <Tab label="도서정보" value="bookInfo" />
        <Tab label="저자의 다른 책" value="author" />
        <Tab label="리뷰" value="reviews" />
        <Tab label="배송" value="delivery" />
      </Tabs>

      <Box id="bookInfo" my={4} ref={bookInfoRef}>
        <Typography variant="h4">도서정보</Typography>
        <TableContainer component={Paper} sx={{ mt: 2, mb: 5 }}>
          <Table sx={{ outline: '1px solid #DFE4DF' }}>
            <TableBody sx={{ outline: '1px solid #DFE4DF' }}>
              <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
                <TableCell sx={{ outline: '1px solid #DFE4DF', backgroundColor: '#DADFDA', width: '15%' }}>도서소개</TableCell>
                <TableCell sx={{ outline: '1px solid #DFE4DF', width: '85%' }}>
                  {selectedBook.description ? selectedBook.description : 'No description available'}
                </TableCell>
              </TableRow>
              <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
                <TableCell sx={{ outline: '1px solid #DFE4DF', backgroundColor: '#DADFDA', width: '15%' }}>isbn</TableCell>
                <TableCell sx={{ outline: '1px solid #DFE4DF', width: '85%' }}>{selectedBook.isbn}</TableCell>
              </TableRow>
              <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
                <TableCell sx={{ outline: '1px solid #DFE4DF', backgroundColor: '#DADFDA', width: '15%' }}>출판날짜</TableCell>
                <TableCell sx={{ outline: '1px solid #DFE4DF', width: '85%' }}>{selectedBook.pubDate}</TableCell>
              </TableRow>
              <TableRow sx={{ outline: '1px solid #DFE4DF' }}>
                <TableCell sx={{ outline: '1px solid #DFE4DF', backgroundColor: '#DADFDA', width: '15%' }}>카테고리</TableCell>
                <TableCell sx={{ outline: '1px solid #DFE4DF', width: '85%' }}>{selectedBook.categoryName}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box id="author" my={4} ref={authorRef}>
        <Typography variant="h4">저자의 다른 책들</Typography>
        <Typography variant="body1">{/* 저자의 다른 책들 북 카드를 여기에 넣습니다 */}</Typography>
      </Box>

      <Box id="reviews" my={4} ref={reviewsRef}>
        <Typography variant="h4">리뷰</Typography>
        <CommentSection comments={comments} addComment={addComment} deleteComment={deleteComment} currentUserId={user?._id} />
      </Box>

      <Box id="delivery" my={4} ref={deliveryRef}>
        <Typography variant="h4">배송/반품/교환 안내</Typography>
        <DeliveryPolicy />
      </Box>
    </Container>
  );
};

export default Info3;
