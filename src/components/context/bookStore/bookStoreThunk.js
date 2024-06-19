import { messages } from './bookStore.messages';
import api from '../../../utils/api';

export const fetchBooksThunk = async (query, { rejectWithValue }) => {
  try {
    const response = await api.get('/book', {
      params: { ...query },
    });

    console.log(response.data);
    if (response.status !== 200) {
      return rejectWithValue(messages.GET_ALL_BOOKS_ERROR.message);
    }
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};
