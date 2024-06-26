import React, { useState } from 'react';
import { Box, Typography, Slider, ButtonGroup, Button } from '@mui/material';

const FilterBar = ({ onFilterChange, onShowAll }) => {
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortOrder, setSortOrder] = useState('asc');

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  const handleFilterApply = () => {
    onFilterChange({ priceRange, sortOrder });
  };

  const commonWidth = '180px'; // Set a common width for slider and buttons

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', height: '400px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Typography variant="body1" sx={{ marginRight: '10px' }}>
            가격 범위:
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            max={50000}
            sx={{ width: commonWidth }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between', marginTop: '10px' }}>
        <Typography variant="body1" sx={{ marginRight: '10px' }}>
          출판일 로부터:
        </Typography>
        <ButtonGroup variant="contained" aria-label="sort order" sx={{ marginBottom: '10px' }}>
          <Button
            sx={{ width: '100px', bgcolor: sortOrder === 'asc' ? 'primary.main' : 'primary.light', color: 'black' }}
            onClick={() => handleSortOrderChange('asc')}>
            최신
          </Button>
          <Button
            sx={{ width: '100px', bgcolor: sortOrder === 'desc' ? 'primary.main' : 'primary.light', color: 'black' }}
            onClick={() => handleSortOrderChange('desc')}>
            오래된
          </Button>
        </ButtonGroup>
      </Box>
      <Box>
        <ButtonGroup variant="outlined" aria-label="filter actions" sx={{ marginBottom: '10px' }}>
          <Button onClick={handleFilterApply} size="medium" sx={{ width: '100px' }}>
            적용
          </Button>
          <Button onClick={onShowAll} size="medium" sx={{ width: '100px' }}>
            모든 도서
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default FilterBar;
