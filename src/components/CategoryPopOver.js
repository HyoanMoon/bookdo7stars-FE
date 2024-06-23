import Box from '@mui/material/Box';
import { ClickAwayListener, Divider, Fade, Grid, List, ListItem, ListItemText, MenuItem, Paper, Popover, Typography } from '@mui/material';
import React from 'react';
import { bookActions } from '../action/bookActions';
import { categoryActions } from '../action/categoryActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Popper } from '@mui/base';

const CategoryPopOver = ({ handlePopperClose, secondAllSubCategories, thirdAllSubCategories, anchorEl, id, open }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedCategory } = useSelector((state) => state.category);

  const clickSubCategory = (category) => {
    console.log(category);
    handlePopperClose();
  };

  return (
    <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start" transition style={{ zIndex: 1500 }}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper
            sx={{
              width: '1000px',
              maxHeight: '500px',
              overflowY: 'auto',
              padding: '10px',
            }}>
            <ClickAwayListener onClickAway={() => handlePopperClose()}>
              <Grid container spacing={2}>
                {Object.keys(secondAllSubCategories).map((firstCategory) => (
                  <Grid item xs={12} key={firstCategory}>
                    <Typography variant="h6" gutterBottom>
                      <strong>{firstCategory}</strong>
                    </Typography>
                    <Grid container spacing={1}>
                      {secondAllSubCategories[firstCategory].map((secondCategory) => (
                        <Grid item xs={12} key={secondCategory}>
                          <Typography variant="subtitle1" gutterBottom>
                            <strong>{secondCategory}</strong>
                          </Typography>
                          <Grid container spacing={1}>
                            {thirdAllSubCategories[firstCategory][secondCategory].map((thirdCategory) => (
                              <Grid item xs={6} sm={4} md={3} key={thirdCategory}>
                                <Typography variant="body2" onClick={() => clickSubCategory(thirdCategory)}>
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
