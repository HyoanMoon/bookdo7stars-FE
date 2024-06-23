import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import MainPage from '../page/MainPage';
import CategoryPage from '../components/CategoryPage';
import BookDetailPage from '../page/BookDetailPage';
import LoginPage from '../page/LoginPage';
import RegisterPage from '../page/RegisterPage';
import CartPage from '../page/CartPage';
import PaymentPage from '../page/PaymentPage';
import OrderCompletePage from '../page/OrderCompletePage';
import MyShoppingPage from '../page/MyShoppingPage';
import MyInfoPage from '../page/MyInfoPage';
import AdminProductPage from '../page/AdminProductPage';
import AdminOrderPage from '../page/AdminOrderPage';
import AdminDashBoardPage from '../page/AdminDashBoardPage';
import SearchedBooksPage from '../page/SearchedBooksPage';
import BooksGroupPage from '../components/BooksGroupPage/BooksGroupPage';
import EditorPage from '../page/EditorPage';
import OauthCallbackPage from '../page/OauthCallbackPage';
// import SocialLoginCallback from '../utils/SocialLoginCallback';
import BooksAllPage from '../components/BooksAllPage/BooksAllPage';

const AppRouter = () => {
  return (
    <div style={{ height: '100%' }}>
      <Routes>
        {/* 메인, 상품 전체, 상품 상세 */}
        <Route index element={<MainPage />} />
        <Route path="/books/category/:categoryid" element={<CategoryPage />} />
        <Route path="/book/:bookid" element={<BookDetailPage />} />
        <Route path="/search" element={<SearchedBooksPage />} />
        <Route path="/books/all" element={<BooksAllPage />} />
        <Route path="/books/group/:bookGroup" element={<BooksGroupPage />} />
        <Route path="/books/editor-recommend" element={<EditorPage />} />

        {/* 로그인, 회원가입 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/oauth/callback/:provider" element={<OauthCallbackPage />} />
        {/* <Route path="/auth/socialLoginCallback" element={<SocialLoginCallback />} /> */}

        {/* 장바구니, 결제, 마이페이지 */}
        <Route element={<PrivateRoute permissionLevel="customer" />}>
          <Route path="/cart" element={<CartPage />} />

          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/success" element={<OrderCompletePage />} />

          <Route path="/account/myshopping" element={<MyShoppingPage />} />
          <Route path="/account/myinfo" element={<MyInfoPage />} />
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
