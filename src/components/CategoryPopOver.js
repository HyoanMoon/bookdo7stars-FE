import { ClickAwayListener, Fade, Grid, Paper, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { bookActions } from '../action/bookActions';
import { categoryActions } from '../action/categoryActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Popper } from '@mui/base';

const CategoryPopOver = ({ handlePopperClose, secondAllSubCategories, thirdAllSubCategories, anchorEl, id, open }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.category);
  const encodeCategoryPath = (path) => encodeURIComponent(path);
  const params = useParams();

  const clickSub3Category = useCallback(
    (firstCategory, secondCategory, thirdCategory) => {
      const newPath = [firstCategory, secondCategory, thirdCategory];
      let categoryPath = newPath.join('>');
      categoryPath = '국내도서>' + categoryPath;
      const categoryid = encodeCategoryPath(categoryPath);
      navigate(`/books/all/category/${categoryid}`);
      handlePopperClose();
    },
    [navigate, handlePopperClose],
  );

  const clickSub2Category = useCallback(
    (firstCategory, secondCategory) => {
      const newPath = [firstCategory, secondCategory];
      let categoryPath = newPath.join('>');
      categoryPath = '국내도서>' + categoryPath;
      const categoryid = encodeCategoryPath(categoryPath);
      navigate(`/books/all/category/${categoryid}`);
      handlePopperClose();
    },
    [navigate, handlePopperClose],
  );

  const clickSubCategory = useCallback(
    (firstCategory) => {
      const newPath = [firstCategory];
      let categoryPath = newPath.join('>');
      categoryPath = '국내도서>' + categoryPath;
      const categoryid = encodeCategoryPath(categoryPath);
      navigate(`/books/all/category/${categoryid}`);
      handlePopperClose();
    },
    [navigate, handlePopperClose],
  );

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
              boxShadow: 3,
              borderRadius: '8px',
              minWidth: '200px',
              minHeight: '200px',
              backgroundColor: 'background.paper',
              '@media (max-width: 600px)': {
                maxWidth: '90%',
                padding: '5px',
              },
            }}
            {...TransitionProps}>
            <ClickAwayListener onClickAway={() => handlePopperClose()}>
              <Grid container spacing={2}>
                {Object.keys(secondAllSubCategories).map((firstCategory, index) => (
                  <Grid item xs={12} key={index} sx={{ paddingBottom: '5px' }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      onClick={() => clickSubCategory(firstCategory)}
                      sx={{
                        cursor: 'pointer',
                        display: 'inline-block',
                        '&:hover': {
                          color: 'primary.main',
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
                                color: 'primary.main',
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
                                      color: 'primary.main',
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
