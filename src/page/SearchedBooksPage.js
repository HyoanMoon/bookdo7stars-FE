import { useSelector } from 'react-redux';
import BookCard from '../components/BookCard';

const SearchedBooksPage = () => {
  const { books } = useSelector((state) => state.book);
  return books.map((book) => {
    return <BookCard book={book} />;
  });
};
export default SearchedBooksPage;
