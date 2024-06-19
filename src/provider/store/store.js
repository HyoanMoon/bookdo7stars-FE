import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { bookStoreReducer } from '../../components/context/bookStore/bookStoreSlice';

const rootReducer = combineReducers({
  bookStore: bookStoreReducer,
});

export const setupStore = (preloadedState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    // SerializableStateInvariantMiddleware 경고 해결
    // Redux 상태나 액션이 직렬화할 수 있는지 검사하는 미들웨어로 인해 발생
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these field paths in all actions
          ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
          // Ignore these paths in the state
          ignoredPaths: ['items.dates'],
          // Optionally set a warning threshold
          warnAfter: 100, // Increase the threshold
        },
      }),
  });
