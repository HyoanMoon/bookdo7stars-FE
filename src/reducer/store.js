import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import bookReducer from './bookReducer';
import orderReducer from './orderReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import favoriteReducer from './favoriteReducer';
import categoryReducer from './categoryReducer';
import commonUiReducer from './commonUIReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    order: orderReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
    ui: commonUiReducer,
    category: categoryReducer,
  },
});

export default store;
