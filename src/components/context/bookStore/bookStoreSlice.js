import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBooksThunk } from './bookStoreThunk';
import { messages } from './bookStore.messages';
import { toast } from 'react-toastify';

export const initialState = {
  books: [],
  getAllBooksLoading: false,
  getAllBooksDone: false,
  getAllBooksError: null,
};

export const fetchBooks = createAsyncThunk('book', fetchBooksThunk);

const bookStoreSlice = createSlice({
  name: 'bookStore',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.getAllBooksLoading = true;
        state.getAllBooksDone = false;
        state.getAllBooksError = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        console.log(action);
        state.getAllBooksLoading = false;
        state.getAllBooksDone = true;
        state.books = action.payload;
        state.getAllBooksError = null;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.getAllBooksLoading = false;
        state.getAllBooksDone = false;
        toast.error(action.payload, {
          toastId: messages.GET_ALL_BOOKS_ERROR.id,
        });
      });
  },
});

export const {} = bookStoreSlice.actions;

export const bookStoreReducer = bookStoreSlice.reducer;
