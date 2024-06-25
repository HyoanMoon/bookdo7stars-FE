import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, MenuItem, Box } from '@mui/material';
import { categoryActions } from '../action/categoryActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CategoryPopOver from './CategoryPopOver';
import { getCategoryHierarchy } from '../_helper/getCategoryHierarchy';
import { getSubCategories } from '../_helper/getSubCategories';
import { getKeyByValue } from '../_helper/getKeyByValue';
import { getBookGroupArray } from '../_helper/getBookGroupArray';

const CategoryBar = ({ bookList }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(categoryActions.getCategoryList());
  }, []);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopperClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };
  const handlePopperClose = () => {
    setOpen(false);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  const totalCategories = [];
  bookList.map((book) => {
    return totalCategories.push(book.categoryName);
  });
  const categoryHierarchy = getCategoryHierarchy(totalCategories);
  const firstSubCategories = getSubCategories(categoryHierarchy, '국내도서');
  const secondAllSubCategories = {};
  const thirdAllSubCategories = {};

  firstSubCategories.forEach((firstCategory) => {
    const secondSubCategories = getSubCategories(categoryHierarchy['국내도서'], firstCategory);
    secondAllSubCategories[firstCategory] = secondSubCategories;
    thirdAllSubCategories[firstCategory] = {};
    secondSubCategories.forEach((secondCategory) => {
      const thirdSubCategories = getSubCategories(categoryHierarchy['국내도서'][firstCategory], secondCategory);
      thirdAllSubCategories[firstCategory][secondCategory] = thirdSubCategories;
    });
  });

  const queryTypes = ['ItemNewAll', 'ItemNewSpecial', 'BestSeller', 'BlogBest'];
  const bookGroups = {
    ItemNewAll: '새로 나온 책',
    ItemNewSpecial: '화제의 신간',
    BestSeller: '베스트 셀러',
    BlogBest: '블로그 베스트',
  };
  const groups = getBookGroupArray(queryTypes, bookGroups);
  groups.push('전체 도서');
  const index = groups.indexOf('전체 도서');

  if (index > -1) {
    const [item] = groups.splice(index, 1);
    groups.unshift(item);
  }

  const goToAllBooksOfGroup = (group) => {
    if (group === '전체 도서') {
      navigate('/books/all');
    } else {
      const queryType = getKeyByValue(bookGroups, group);
      navigate(`/books/group/${queryType}`);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box>
          <CategoryPopOver
            anchorEl={anchorEl}
            secondAllSubCategories={secondAllSubCategories}
            thirdAllSubCategories={thirdAllSubCategories}
            handlePopperClose={handlePopperClose}
            id={id}
            open={open}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '80%' }}>
            {groups.map((group, index) => (
              <MenuItem key={index} onClick={() => goToAllBooksOfGroup(group)}>
                <Typography variant="body1" component="div" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }, cursor: 'pointer' }}>
                  {group}
                </Typography>
              </MenuItem>
            ))}
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography
              variant="h7"
              component="div"
              aria-describedby={id}
              onClick={handlePopperClick}
              sx={{ cursor: 'pointer', fontSize: { xs: '0.8rem', sm: '1rem' } }}>
              전체 카테고리
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CategoryBar;
