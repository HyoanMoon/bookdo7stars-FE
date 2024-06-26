import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import BookImage from '../components/BookDetailPage/Book.image';
import BookBasicInfo from '../components/BookDetailPage/BookBasicInfo';
import BookToCart from '../components/BookDetailPage/BookToCart';
// import BookDetailInfo from '../components/BookDetailPage/BookDetailInfo';
import AddressChange from '../components/BookDetailPage/AddressChange';
import DeliveryEstimate from '../components/BookDetailPage/DeliveryEstimate';
import { useDispatch, useSelector } from 'react-redux';
import { bookActions } from '../action/bookActions';
import Info3 from '../components/BookDetailPage/Info3';
// import ClipLoader from 'react-spinners/ClipLoader';
import { favoriteActions } from '../action/favoriteActions';

const BookDetailPage = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState('지역을 선택해주세요');
  const { fullAddress, deliveryInfo } = useSelector((state) => state.order);
  const { selectedBook, getBooksLoading, otherBooksByAuthor } = useSelector((state) => state.book);
  const { bookid } = useParams();
  const navigate = useNavigate();
  const { favorite } = useSelector((state) => state.favorite);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(favoriteActions.getFavorite());
  }, [dispatch, user]);

  useEffect(() => {
    if (bookid) {
      dispatch(bookActions.getBookDetail(bookid));
    }
  }, [bookid]);

  if (getBooksLoading || !selectedBook) {
    return <div className="loading"></div>;
  }

  return (
    <Box sx={{ mt: 20 }}>
      <Container>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={10} sm={12} md={4}>
            {selectedBook.cover && <BookImage cover={selectedBook.cover} />}
          </Grid>
          <Grid item xs={6} sm={12} md={8}>
            <BookBasicInfo title={selectedBook.title} author={selectedBook.author} publisher={selectedBook.publisher} price={selectedBook.priceStandard} />
            <BookToCart
              favorite={favorite?.some((favorite) => favorite._id === selectedBook._id)}
              selectedBook={selectedBook}
              fullAddress={fullAddress}
              deliveryInfo={deliveryInfo}
              deliveryAddress={address} // 전달할 주소 추가
            />
            <Grid item mt={4}>
              {/* <BookDetailInfo pubDate={selectedBook.pubDate} isbn={selectedBook.isbn} /> */}
              {/* 여기에 다음 API */}
              <div style={{ fontWeight: 'bold' }}> 배송 정보 </div>
              <h6>{address}</h6>
              <AddressChange setAddress={setAddress} />
              <DeliveryEstimate address={address} />
            </Grid>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={12}>
            <BookDescription description={selectedBook.description} />
          </Grid> */}
          <Grid item xs={12} sm={12} md={12}>
            <Info3 selectedBook={selectedBook} otherBooksByAuthor={otherBooksByAuthor} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BookDetailPage;
