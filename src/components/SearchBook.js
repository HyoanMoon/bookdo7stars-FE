import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import * as React from 'react';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';

const SearchBook = ({ searchQuery, setSearchQuery, fields, resetSearch }) => {
  const [selectedField, setSelectedField] = useState(fields[0]); // isbn
  const handleChange = (event) => {
    event.preventDefault();
    setSelectedField(event.target.value);
  };
  return (
    <div>
      <TextField select label="Search by" onChange={handleChange} variant="standard" sx={{ mt: 1, width: '11ch' }}>
        {/* 선택할 검색 필드 목록 */}
        {fields.map((item) => (
          <MenuItem key={item} value={item || ''}>
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
          onChange={(event) => setSearchQuery({ ...searchQuery, [selectedField]: event.target.value })}
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
    </div>
  );
};

export default SearchBook;
