import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@redux-devtools/extension';
import bookReducer from './bookReducer';
import orderReducer from './orderReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import favoriteReducer from './favoriteReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    order: orderReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
  },
});

export default store;
