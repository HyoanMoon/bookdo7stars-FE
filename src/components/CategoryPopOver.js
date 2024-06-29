import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Popper } from '@mui/base';

const CategoryPopOver = ({ handlePopperClose, secondAllSubCategories, thirdAllSubCategories, anchorEl, id, open }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.category);
  const encodeCategoryPath = (path) => encodeURIComponent(path);
  const params = useParams();

  const clickSub3Category = (firstCategory, secondCategory, thirdCategory) => {
    const newPath = [firstCategory, secondCategory, thirdCategory];
    let categoryPath = newPath.join('>');
    categoryPath = '국내도서>' + categoryPath;
    const categoryid = encodeCategoryPath(categoryPath);
    navigate(`/books/all/category/${categoryid}`);
    handlePopperClose();
  };

  const clickSub2Category = (firstCategory, secondCategory) => {
    const newPath = [firstCategory, secondCategory];
    let categoryPath = newPath.join('>');
    categoryPath = '국내도서>' + categoryPath;
    const categoryid = encodeCategoryPath(categoryPath);
    navigate(`/books/all/category/${categoryid}`);
    handlePopperClose();
  };

  const clickSubCategory = (firstCategory) => {
    const newPath = [firstCategory];
    let categoryPath = newPath.join('>');
    categoryPath = '국내도서>' + categoryPath;
    const categoryid = encodeCategoryPath(categoryPath);
    navigate(`/books/all/category/${categoryid}`);
    handlePopperClose();
  };

  return (
    <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start" transition style={{ zIndex: 1500 }}>
      {({ TransitionProps }) => (
        <Paper
          sx={{
            width: '100%',
            maxWidth: '1000px',
            maxHeight: '500px',
            overflowY: 'auto',
            padding: '10px',
            boxShadow: 3,
            borderRadius: '8px',
            minWidth: '200px',
            minHeight: '200px',
            backgroundColor: 'background.paper',
            '@media (max-width: 600px)': {
              maxWidth: '90%',
              padding: '5px',
            },
          }}
          {...TransitionProps}>
          <Box>
            {Object.keys(secondAllSubCategories).map((firstCategory, index) => (
              <Box key={index} sx={{ paddingBottom: '10px' }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  onClick={() => clickSubCategory(firstCategory)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}>
                  <strong>{firstCategory}</strong>
                </Typography>
                {secondAllSubCategories[firstCategory].map((secondCategory, idx) => (
                  <Box key={idx} sx={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      onClick={() => clickSub2Category(firstCategory, secondCategory)}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}>
                      <strong>{secondCategory}</strong>
                    </Typography>
                    {thirdAllSubCategories[firstCategory][secondCategory].map((thirdCategory, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        onClick={() => clickSub3Category(firstCategory, secondCategory, thirdCategory)}
                        sx={{
                          cursor: 'pointer',
                          paddingLeft: '20px',
                          '&:hover': {
                            color: 'primary.main',
                          },
                        }}>
                        {thirdCategory}
                      </Typography>
                    ))}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </Popper>
  );
};

export default CategoryPopOver;
