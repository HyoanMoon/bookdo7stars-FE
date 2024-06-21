import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import AdminPageSearchBox from '../components/AdminPageSearchBox';
import AdminPageProductTable from '../components/AdminPageProductTable';
import AdminPageProductDialog from '../components/AdminPageProductDialog';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bookActions } from '../action/bookActions';

const AdminProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookTableHead = ['Cover', 'ISBN', 'Title', 'Author', 'Stock', 'Publisher', 'Price', ''];
  const { bookList } = useSelector((state) => state.book);
  const [query, setQuery] = useSearchParams();
  const fields = ['isbn', 'title', 'author', 'category', 'publisher'];

  const totalField = fields.reduce((total, item) => {
    total[item] = query.get(item) || '';
    return total;
  }, {});
  const [searchQuery, setSearchQuery] = useState(totalField);
  // console.log('totalField', totalField);

  useEffect(() => {
    if (searchQuery.isbn === '') delete searchQuery.isbn;
    if (searchQuery.title === '') delete searchQuery.title;
    if (searchQuery.author === '') delete searchQuery.author;
    if (searchQuery.category === '') delete searchQuery.category;
    if (searchQuery.publisher === '') delete searchQuery.publisher;

    // console.log('searchQuery', searchQuery);
    const params = new URLSearchParams();
    Object.keys(searchQuery).forEach((key) => {
      const value = searchQuery[key];
      if (value !== undefined && value !== '') {
        params.append(key, value);
      }
    });
    navigate('?' + params.toString());
    dispatch(bookActions.getBookList(searchQuery));
  }, [searchQuery, navigate, dispatch]);

  const resetSearch = () => {
    setSearchQuery({});
  };

  useEffect(() => {
    resetSearch();
  }, []);

  // 다이얼로그 열기 및 상품 수정
  const [openDialog, setOpenDialog] = useState(false);
  const [editBook, setEditBook] = useState(null);

  const handleOpenNewDialog = () => {
    setEditBook(null);
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (product) => {
    setEditBook(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditBook(null);
  };

  // 상품 삭제
  const handleDeleteProduct = (bookId) => {
    dispatch(bookActions.deleteBook(bookId));
    console.log(`Deleting product with ID: ${bookId}`);
  };

  // 도서 더미 데이터
  // const bookList = [
  //   {
  //     _id: '66740c453428f4d7dbe12b14',
  //     isbn: 'K522931912',
  //     title: '그늘 산책',
  //     author: '김윤경 (지은이)',
  //     description: '',
  //     cover: 'https://www.taragrp.co.kr/wp-content/uploads/2022/07/도서-제본_01-2.png',
  //     stockStatus: '예약판매',
  //     publisher: '향출판사',
  //     priceStandard: 18000,
  //   },
  // ];
  return (
    <Container>
      <Grid container>
        <Grid item xs={1} md={1}>
          상품 관리
        </Grid>
        <Grid item xs={11} md={11}>
          {/* 검색 박스 */}
          <AdminPageSearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            fields={fields}
            resetSearch={resetSearch}
            handleOpenNewDialog={handleOpenNewDialog}
          />

          {/* 상품 테이블 */}
          <AdminPageProductTable
            bookList={bookList}
            bookTableHead={bookTableHead}
            handleOpenEditDialog={handleOpenEditDialog}
            handleDeleteProduct={handleDeleteProduct}
          />

          {/* 상품 다이얼로그 */}
          <AdminPageProductDialog open={openDialog} handleClose={handleCloseDialog} editBook={editBook} setOpenDialog={setOpenDialog} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminProductPage;
