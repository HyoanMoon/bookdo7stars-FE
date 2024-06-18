import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import MainPage from '../page/MainPage';
import CategoryPage from '../page/CategoryPage';
import ProductDetailPage from '../page/ProductDetailPage';
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

const AppRouter = () => {
  return (
    <div>
      <Routes>
        {/* 메인, 상품 전체, 상품 상세 */}
        <Route path="/" element={<MainPage />} />
        <Route path="/books">
          <Route index element={<CategoryPage />} />
          <Route path=":id" element={<ProductDetailPage />} />
        </Route>

        {/* 로그인, 회원가입 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 장바구니, 결제, 마이페이지 */}
        <Route element={<PrivateRoute permissionLevel="customer" />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment">
            <Route index element={<PaymentPage />} />
            <Route path="/success" element={<OrderCompletePage />} />
          </Route>
          <Route path="/account">
            <Route path="/myShopping" element={<MyShoppingPage />} />
            <Route path="/myInfo" element={<MyInfoPage />} />
          </Route>
        </Route>

        {/* 어드민 */}
        <Route element={<PrivateRoute permissionLevel="admin" />}>
          <Route path="/admin">
            <Route path="/product" element={<AdminProductPage />} />
            <Route path="/order" element={<AdminOrderPage />} />
            <Route path="/dashboard" element={<AdminDashBoardPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default AppRouter;
