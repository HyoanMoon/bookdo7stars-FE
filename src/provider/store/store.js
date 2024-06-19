import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { bookStoreReducer } from '../../components/context/bookStore/bookStoreSlice';

const rootReducer = combineReducers({
  bookStore: bookStoreReducer,
});

export const setupStore = (preloadedState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });
