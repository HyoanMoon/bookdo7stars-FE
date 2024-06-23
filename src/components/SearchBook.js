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

const SearchBook = ({ searchQuery, setSearchQuery, fields, resetSearch }) => {
  const [selectedField, setSelectedField] = useState(fields[0]);
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedField(event.target.value);
  };

  const handleSearch = () => {
    const queryValue = searchQuery[selectedField] || '';
    if (queryValue.trim() === '') {
      console.log('Navigating to: /');
      navigate('/');
    } else {
      const searchPath = `/search?${selectedField}=${queryValue}`;
      console.log('Navigating to:', searchPath);
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
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Box sx={{ width: '7vw' }}>
        <TextField select label="Search by" value={selectedField} onChange={handleChange} variant="standard" sx={{ mt: 1, width: '11ch', textAlign: 'center' }}>
          {fields.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box>
        <FormControl sx={{ width: '60vw' }}>
          <TextField
            variant="filled"
            placeholder={'찾으시는 상품을 검색하세요.'}
            color="success"
            focused
            value={searchQuery[selectedField] || ''}
            onChange={(event) => setSearchQuery({ [selectedField]: event.target.value })}
            onKeyPress={handleKeyPress}
            sx={{ backgroundColor: '#fff' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Box>
      <Box sx={{ width: '3vw' }}>
        <IconButton type="button" aria-label="reset" onClick={handleReset}>
          <RefreshIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SearchBook;
