import Box from '@mui/material/Box';
import { Grid, MenuItem, Popover } from '@mui/material';
import React from 'react';
import { bookActions } from '../action/bookActions';
import { categoryActions } from '../action/categoryActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CategoryPopOver = ({ handleClose, categories, anchorEl }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedCategory } = useSelector((state) => state.category);

  const onSelectCategory = (category) => {
    console.log(category);
    dispatch(categoryActions.setSelectedCategory(category));
    // navigate(`/book/category/${category.categoryId}`);
  };

  const handleMenuItemClick = (category) => {
    onSelectCategory(category);
    handleClose();
  };
  const open = Boolean(anchorEl);
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
      <Box sx={{ minWidth: '200px', padding: 2 }}>
        <Grid container spacing={2}>
          {categories.map((category, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <MenuItem selected={category === selectedCategory} onClick={() => handleMenuItemClick(category)} sx={{ width: '100%', textAlign: 'center' }}>
                {category.categoryName}
              </MenuItem>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Popover>
  );
};

export default CategoryPopOver;
