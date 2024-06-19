import { messages } from './bookStore.messages';

const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BACKEND_PROXY : process.env.REACT_APP_LOCAL_BACKEND;

export const fetchBooksThunk = async (query, { rejectWithValue }) => {
  try {
    // const response = await api.get('/book');
    const response = await fetch(`${backendURL}/api/book?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.status !== 200) {
      const errorMessage = await response.text(); // 응답 메시지를 확인합니다.
      return rejectWithValue(messages.GET_ALL_BOOKS_ERROR.message || errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
