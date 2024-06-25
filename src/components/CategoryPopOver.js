import { ClickAwayListener, Fade, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { bookActions } from '../action/bookActions';
import { categoryActions } from '../action/categoryActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Popper } from '@mui/base';

const CategoryPopOver = ({ handlePopperClose, secondAllSubCategories, thirdAllSubCategories, anchorEl, id, open }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.category);

  const clickSub3Category = (firstCategory, secondCategory, thirdCategory) => {
    const newPath = [firstCategory, secondCategory, thirdCategory];
    let categoryPath = newPath.join('>');
    categoryPath = '국내도서>' + categoryPath;
    let categoryid;
    categories.find((category) => {
      if (category.categoryName === categoryPath) {
        categoryid = category.categoryId;
      }
    });
    if (categoryid) {
      dispatch(categoryActions.setSelectedCategoryId(categoryid));
      dispatch(categoryActions.setSelectedCategoryPath(categoryPath));
      dispatch(bookActions.getBookListByCategory(categoryid));
    } else {
      dispatch(categoryActions.setSelectedCategoryId(null));
      dispatch(categoryActions.setSelectedCategoryPath(null));
      dispatch(bookActions.resetBookListByCategory([]));
    }
    navigate(`/books/all/category`);
    handlePopperClose();
  };

  const clickSub2Category = (firstCategory, secondCategory) => {
    const newPath = [firstCategory, secondCategory];
    let categoryPath = newPath.join('>');
    categoryPath = '국내도서>' + categoryPath;
    dispatch(categoryActions.setSelectedCategoryPath(categoryPath));
    navigate(`/books/all/category`);
    handlePopperClose();
  };
  const clickSubCategory = (firstCategory) => {
    const newPath = [firstCategory];
    let categoryPath = newPath.join('>');
    categoryPath = '국내도서>' + categoryPath;
    dispatch(categoryActions.setSelectedCategoryPath(categoryPath));
    navigate(`/books/all/category`);
    handlePopperClose();
  };

  return (
    <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start" transition style={{ zIndex: 1500 }}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper
            sx={{
              width: '100%',
              maxWidth: '1000px',
              maxHeight: '500px',
              overflowY: 'auto',
              padding: '10px',
              border: '1px solid',
              borderColor: 'primary.main',
              borderRadius: '4px',
              minWidth: '200px', // 최소 너비 설정
              minHeight: '200px', // 최소 높이 설정
            }}
            {...TransitionProps}>
            <ClickAwayListener onClickAway={() => handlePopperClose()}>
              <Grid container spacing={2}>
                {Object.keys(secondAllSubCategories).map((firstCategory, index) => (
                  <Grid item xs={12} key={index} sx={{ paddingBottom: '5px' }}>
                    {' '}
                    <Typography
                      variant="h6"
                      gutterBottom
                      onClick={() => clickSubCategory(firstCategory)}
                      sx={{
                        cursor: 'pointer',
                        display: 'inline-block',
                        '&:hover': {
                          backgroundColor: 'primary.light', // 원하는 배경색으로 변경하세요.
                        },
                      }}>
                      <strong>{firstCategory}</strong>
                    </Typography>
                    <Grid container spacing={1}>
                      {secondAllSubCategories[firstCategory].map((secondCategory, idx) => (
                        <Grid
                          item
                          xs={12}
                          key={idx}
                          sx={{
                            paddingBottom: '5px',
                          }}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            onClick={() => clickSub2Category(firstCategory, secondCategory)}
                            sx={{
                              cursor: 'pointer',
                              display: 'inline-block',
                              '&:hover': {
                                backgroundColor: 'primary.light', // 원하는 배경색으로 변경하세요.
                              },
                            }}>
                            <strong>{secondCategory}</strong>
                          </Typography>
                          <Grid container spacing={1}>
                            {thirdAllSubCategories[firstCategory][secondCategory].map((thirdCategory, idx) => (
                              <Grid item xs={6} sm={4} md={3} key={idx}>
                                <Typography
                                  variant="body2"
                                  onClick={() => clickSub3Category(firstCategory, secondCategory, thirdCategory)}
                                  sx={{
                                    cursor: 'pointer',
                                    display: 'inline-block',
                                    '&:hover': {
                                      backgroundColor: 'primary.light', // 원하는 배경색으로 변경하세요.
                                    },
                                  }}>
                                  {thirdCategory}
                                </Typography>
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </ClickAwayListener>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

export default CategoryPopOver;
