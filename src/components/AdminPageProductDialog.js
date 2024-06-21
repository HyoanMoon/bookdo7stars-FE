import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { bookActions } from '../action/bookActions';
import CloudImageUpload from '../utils/CloudImageUpload';

const AdminPageProductDialog = ({ open, handleClose, editBook, setOpenDialog }) => {
  const dispatch = useDispatch();
  const initialProductState = {
    isbn: '',
    title: '',
    author: '',
    stockStatus: '',
    publisher: '',
    priceStandard: '',
    cover: '',
    description: '',
    categoryName: '',
    priceSales: '',
  };

  const [product, setProduct] = useState(initialProductState);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (editBook) {
      setProduct(editBook);
      setImagePreview(editBook.cover);
    } else {
      setProduct(initialProductState);
      setImagePreview('');
    }
  }, [editBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));

    if (name === 'cover') {
      setImagePreview(value);
    }
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (editBook) {
      // 상품 수정 로직
      console.log('Updating product:', product);
      dispatch(bookActions.updateBook(product));
    } else {
      // 새 상품 추가 로직
      dispatch(bookActions.createBook(product));
      console.log('Adding new product:', product);
      setOpenDialog(false);
    }
    handleClose();
  };

  const handleImageUpload = (url) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      cover: url,
    }));
    setImagePreview(url);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{editBook ? 'Edit Product' : 'New Product'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="isbn"
          label="ISBN"
          type="text"
          fullWidth
          variant="standard"
          value={product?.isbn || ''}
          onChange={handleChange}
        />
        <TextField margin="dense" name="title" label="Title" type="text" fullWidth variant="standard" value={product?.title || ''} onChange={handleChange} />
        <TextField margin="dense" name="author" label="Author" type="text" fullWidth variant="standard" value={product?.author || ''} onChange={handleChange} />
        <TextField
          id="outlined-multiline-static"
          multiline
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          value={product?.description || ''}
          onChange={handleChange}
          rows={3}
        />
        <TextField
          margin="dense"
          name="categoryName"
          label="Category"
          type="text"
          fullWidth
          variant="standard"
          value={product?.categoryName || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="stockStatus"
          label="Stock Status"
          type="text"
          fullWidth
          variant="standard"
          value={product?.stockStatus || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="publisher"
          label="Publisher"
          type="text"
          fullWidth
          variant="standard"
          value={product?.publisher || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="priceStandard"
          label="Standard Price"
          type="number"
          fullWidth
          variant="standard"
          value={product?.priceStandard || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="priceSales"
          label="Sales Price"
          type="number"
          fullWidth
          variant="standard"
          value={product?.priceSales || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="cover"
          label="Cover URL"
          type="text"
          fullWidth
          variant="outlined"
          value={product?.cover || ''}
          onChange={handleChange}
        />
        {imagePreview && <img src={imagePreview} alt="cover preview" style={{ width: '30%', height: 'auto', marginTop: '20px' }} />}
        <CloudImageUpload onUpload={handleImageUpload} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminPageProductDialog;
