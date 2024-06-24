import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import MainPage from '../page/MainPage';
import CategoryPage from '../page/CategoryPage';
import BookDetailPage from '../page/BookDetailPage';
import LoginPage from '../page/LoginPage';
import RegisterPage from '../page/RegisterPage';
import CartPage from '../page/CartPage';
import PaymentPage from '../page/PaymentPage';
import OrderCompletePage from '../page/OrderCompletePage';
import MyShoppingPage from '../page/MyShoppingPage';
import AdminProductPage from '../page/AdminProductPage';
import AdminOrderPage from '../page/AdminOrderPage';
import AdminDashBoardPage from '../page/AdminDashBoardPage';
import AppLayout from '../Layout/AppLayout';
import MyPageOrderList from '../page/MyPageOrderList';
import MyPageOrderClaimList from '../page/MyPageOrderClaimList';
import MyPageOrderCancelList from '../page/MyPageOrderCancelList';
import MyPageMyReview from '../page/MyPageMyReview';
import MyPageWishList from '../page/MyPageWishList';

const AppRouter = () => {
  return (
    <div>
      <Routes>
        {/* 메인, 상품 전체, 상품 상세 */}
        <Route index element={<MainPage />} />

        <Route path="/books/:categoryId" element={<CategoryPage />} />
        <Route path="/book/:bookId" element={<BookDetailPage />} />

        {/* 로그인, 회원가입 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 장바구니, 결제, 마이페이지 */}
        <Route element={<PrivateRoute permissionLevel="customer" />}>
          <Route path="/cart" element={<CartPage />} />

          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/success" element={<OrderCompletePage />} />

          <Route path="/mypage" element={<MyShoppingPage />} />
          <Route path="/mypage/orderlist" element={<MyPageOrderList />} />
          <Route path="/mypage/orderclaimlist" element={<MyPageOrderClaimList />} />
          <Route path="/mypage/ordercancellist" element={<MyPageOrderCancelList />} />
          <Route path="/mypage/myreview" element={<MyPageMyReview />} />
          <Route path="/mypage/wishlist" element={<MyPageWishList />} />
        </Route>

        {/* 어드민 */}
        <Route element={<PrivateRoute permissionLevel="admin" />}>
          <Route path="/admin/product" element={<AdminProductPage />} />
          <Route path="/admin/order" element={<AdminOrderPage />} />
          <Route path="/admin/dashboard" element={<AdminDashBoardPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRouter;
