import Box from '@mui/material/Box';
import { Grid, MenuItem, Popover } from '@mui/material';
import React from 'react';

const CategoryPopOver = ({ handleClose, categories, anchorEl }) => {
  const selectedCategory = 'category';

  const onSelectCategory = (category) => {
    console.log(category);
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
