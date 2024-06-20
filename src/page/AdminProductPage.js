import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import AdminPageSearchBox from '../components/AdminPageSearchBox';
import AdminPageProductTable from '../components/AdminPageProductTable';
import AdminPageProductDialog from '../components/AdminPageProductDialog';

const AdminProductPage = () => {
  // 도서 더미 데이터
  const products = [
    {
      _id: '66725557e34388f03ecab81f',
      isbn: 'K522931912',
      title: '그늘 산책',
      author: '김윤경 (지은이)',
      description: '',
      cover: 'https://www.taragrp.co.kr/wp-content/uploads/2022/07/도서-제본_01-2.png',
      stockStatus: '예약판매',
      publisher: '향출판사',
      priceStandard: 18000,
    },
  ];
  const productTableHead = ['Cover', 'ISBN', 'Title', 'Author', 'Stock', 'Publisher', 'Price', ''];

  return (
    <Container>
      <Grid container>
        <Grid item xs={1} md={1}>
          상품 관리
        </Grid>
        <Grid item xs={11} md={11}>
          {/* 검색 박스 */}
          <AdminPageSearchBox />
          {/* 상품 테이블 */}
          <AdminPageProductTable products={products} productTableHead={productTableHead} />
          {/* 상품 다이얼로그 */}
          <AdminPageProductDialog />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminProductPage;
