import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import * as React from 'react';
import { Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

const SearchBook = ({ searchQuery, setSearchQuery, fields, resetSearch, isMobile }) => {
  const [selectedField, setSelectedField] = useState(fields[0]);
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedField(event.target.value);
  };

  const handleSearch = () => {
    const queryValue = searchQuery[selectedField] || '';
    if (queryValue.trim() === '') {
      navigate('/');
      setSearchQuery('');
    } else {
      const searchPath = `/search?${selectedField}=${queryValue}`;
      // Reset the search query to keep only the selected field
      const newSearchQuery = { [selectedField]: queryValue };
      setSearchQuery(newSearchQuery);
      navigate(searchPath);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleReset = () => {
    setInputValue('');
    resetSearch();
    navigate('/');
  };

  return (
    <Box>
      <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: '1 1 auto', mb: isMobile ? 2 : 0 }}>
        <TextField
          variant="filled"
          placeholder="찾으시는 상품을 검색하세요."
          color="success"
          focused
          value={searchQuery[selectedField] || ''}
          onChange={(event) => setSearchQuery({ ...searchQuery, [selectedField]: event.target.value })}
          onKeyPress={handleKeyPress}
          sx={{ backgroundColor: '#fff', flex: '1 1 auto' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <IconButton type="button" aria-label="reset" onClick={handleReset}>
          <RefreshIcon />
        </IconButton>
      </FormControl>
    </Box>
  );
};

export default SearchBook;
