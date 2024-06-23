import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bookActions } from '../../action/bookActions';
import { getCategories } from '../../_helper/getCategories';
import { getGroupNameInKorean } from '../../_helper/getGroupNameInKorean';
import BooksGroupContainer from './BooksGroupContainer';

const BooksGroupPage = () => {
  const dispatch = useDispatch();
  const { books, groupBooks } = useSelector((state) => state.book);

  const bookGroup = useParams();
  console.log('[BooksGroupPage에서]파람스로 받아온 bookGroup: ', bookGroup);

  useEffect(() => {
    if (bookGroup) {
      dispatch(bookActions.getBookListByGroup(bookGroup.bookGroup));
    }
  }, [bookGroup]);

  if (!books) {
    return;
  }
  if (!groupBooks || !bookGroup) {
    return;
  }
  const groupBooksCategories = getCategories(groupBooks);
  const groupNameInKorean = getGroupNameInKorean(bookGroup.bookGroup);

  return (
    <>
      <Container sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{ marginBottom: '50px', marginTop: '10px' }}>
          <BooksGroupContainer books={groupBooks} categories={groupBooksCategories} title={groupNameInKorean} moreButtonShowed={false} />
        </Box>
      </Container>
      {/* <Footer /> */}
    </>
  );
};
export default BooksGroupPage;

//backgroundColor: 'primary.light'
