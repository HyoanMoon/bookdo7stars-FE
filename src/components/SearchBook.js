import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import * as React from 'react';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

const SearchBook = ({ searchQuery, setSearchQuery, fields, resetSearch }) => {
  const [selectedField, setSelectedField] = useState(fields[0]);
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

  return (
    <div>
      <TextField select label="Search by" value={selectedField} onChange={handleChange} variant="standard" sx={{ mt: 1, width: '11ch' }}>
        {fields.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
      <FormControl>
        <TextField
          variant="filled"
          placeholder={'찾으시는 상품을 검색하세요.'}
          color="success"
          focused
          value={searchQuery[selectedField] || ''}
          onChange={(event) => setSearchQuery({ [selectedField]: event.target.value })}
          onKeyPress={handleKeyPress}
          sx={{ backgroundColor: '#fff', width: '500px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <IconButton type="button" sx={{ mt: 3 }} aria-label="reset" onClick={resetSearch}>
        <RefreshIcon />
      </IconButton>
      <IconButton type="button" sx={{ mt: 3 }} aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBook;
