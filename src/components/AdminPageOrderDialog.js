// import React, { useState } from 'react';
// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Grid, Typography } from '@mui/material';

// const AdminPageOrderDialog = ({ open, handleClose, orderDetails }) => {
//   const initialBookState = {
//     isbn: '',
//     title: '',
//     author: '',
//     categoryName: '',
//     publisher: '',
//     cover: '',
//     description: '',
//     priceStandard: '',
//     priceSales: '',
//     stockStatus: '',
//   };

//   const [bookForm, setBookForm] = useState(editBook || { ...initialBookState });

//   return (
//     <Dialog open={open} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//       <DialogTitle>{editBook ? '상품 수정' : '상품 추가'}</DialogTitle>
//       <DialogContent>
//         <TextField
//           autoFocus
//           margin="dense"
//           name="isbn"
//           label="ISBN"
//           type="text"
//           fullWidth
//           variant="standard"
//           value={bookForm?.isbn || ''}
//           onChange={handleChange}
//         />
//         <TextField margin="dense" name="title" label="도서명" type="text" fullWidth variant="standard" value={bookForm?.title || ''} onChange={handleChange} />
//         <TextField
//           margin="dense"
//           name="author"
//           label="저자 외"
//           type="text"
//           fullWidth
//           variant="standard"
//           value={bookForm?.author || ''}
//           onChange={handleChange}
//         />
//         <TextField
//           id="outlined-multiline-static"
//           multiline
//           margin="dense"
//           name="description"
//           label="도서 설명"
//           type="text"
//           fullWidth
//           variant="standard"
//           value={bookForm?.description || ''}
//           onChange={handleChange}
//           rows={3}
//         />
//         <TextField
//           margin="dense"
//           name="categoryName"
//           label="카테고리"
//           type="text"
//           fullWidth
//           variant="standard"
//           value={bookForm?.categoryName || ''}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="dense"
//           name="stockStatus"
//           label="도서 재고"
//           type="text"
//           fullWidth
//           variant="standard"
//           value={bookForm?.stockStatus || ''}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="dense"
//           name="publisher"
//           label="출판사"
//           type="text"
//           fullWidth
//           variant="standard"
//           value={bookForm?.publisher || ''}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="dense"
//           name="priceStandard"
//           label="정가"
//           type="number"
//           fullWidth
//           variant="standard"
//           value={bookForm?.priceStandard || ''}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="dense"
//           name="priceSales"
//           label="판매가"
//           type="number"
//           fullWidth
//           variant="standard"
//           value={bookForm?.priceSales || ''}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="dense"
//           name="cover"
//           label="커버 이미지"
//           type="text"
//           fullWidth
//           variant="outlined"
//           value={bookForm?.cover || ''}
//           onChange={handleChange}
//         />
//         {imagePreview && <img src={imagePreview} alt="cover preview" style={{ width: '30%', height: 'auto', marginTop: '20px' }} />}
//         <CloudImageUpload onUpload={handleImageUpload} />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleCloseDialog}>Cancel</Button>
//         <Button onClick={handleSubmit}>Save</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AdminPageOrderDialog;
