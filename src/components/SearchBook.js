import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import * as React from 'react';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBook = () => {
  return (
    <FormControl>
      <TextField
        variant="filled"
        placeholder={'찾으시는 상품을 검색하세요.'}
        color="success"
        focused
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
  );
};

export default SearchBook;
