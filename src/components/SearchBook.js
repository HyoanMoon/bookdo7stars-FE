import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import * as React from 'react';
import { Box, InputAdornment, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBook = ({ searchQuery, setSearchQuery, fields, resetSearch }) => {
  const [selectedField, setSelectedField] = useState(fields[0]);

  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

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

  return (
    <Box sx={{ width: '100%', p: isMobile ? 1 : 2 }}>
      <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        <TextField
          variant="filled"
          placeholder="찾으시는 상품을 검색하세요."
          color="success"
          focused
          value={searchQuery[selectedField] || ''}
          onChange={(event) => setSearchQuery({ ...searchQuery, [selectedField]: event.target.value })}
          onKeyPress={handleKeyPress}
          sx={{ backgroundColor: '#fff', flexGrow: 1, mr: isMobile ? 1 : 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            style: isMobile ? { fontSize: '0.75rem' } : {},
          }}
        />
      </FormControl>
    </Box>
  );
};

export default SearchBook;
