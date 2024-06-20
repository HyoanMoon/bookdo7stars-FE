import React from 'react';
import { Paper, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AdminPageProductTable = ({ products, productTableHead, handleOpenDialog, handleDeleteDialog }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      {/* 상품 테이블 */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 590 }}>
          {/* maxHeight: 440 */}
          <Table stickyHeader aria-label="sticky table">
            {/* 테이블 헤더 */}
            <TableHead>
              <TableRow>
                {productTableHead.map((head, index) => (
                  <StyledTableCell key={index}>{head}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* 테이블 바디 */}
            <TableBody>
              {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                <StyledTableRow key={product._id}>
                  <StyledTableCell component="th" scope="row">
                    <img src={product.cover} alt={product.title} style={{ width: '50px', height: '50px' }} />
                  </StyledTableCell>
                  <StyledTableCell>{product.isbn}</StyledTableCell>
                  <StyledTableCell>{product.title}</StyledTableCell>
                  <StyledTableCell>{product.author}</StyledTableCell>
                  <StyledTableCell>{product.stockStatus}</StyledTableCell>
                  <StyledTableCell>{product.publisher}</StyledTableCell>
                  <StyledTableCell>{product.priceStandard}</StyledTableCell>
                  <StyledTableCell>
                    <Button onClick={() => handleOpenDialog(product)}>Edit</Button>
                    <Button onClick={() => handleDeleteDialog(product._id)}>Delete</Button>
                  </StyledTableCell>{' '}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* 테이블 페이지네이션 */}
        <TablePagination
          rowsPerPageOptions={[7, 5, 6]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default AdminPageProductTable;
