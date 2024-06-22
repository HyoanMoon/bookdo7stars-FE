import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

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

const AdminPageOrderTable = ({ orderTableHead, orderList }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // 페이지네이션
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {/* 상품 테이블 */}
      <TableContainer component={Paper}>
        <Table>
          {/* 테이블 헤더 */}
          <TableHead>
            <TableRow>
              {orderTableHead.map((head, index) => (
                <TableCell key={index}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* ex: 이 도서 외 2개 */}

          {/* 테이블 바디 */}
          <TableBody>
            {orderList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
              <StyledTableRow key={order.id}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{order.id}</StyledTableCell>
                <StyledTableCell>{order.createdAt}</StyledTableCell>
                <StyledTableCell>{order.email}</StyledTableCell>
                <StyledTableCell>{order.books}</StyledTableCell>
                <StyledTableCell>{order.address}</StyledTableCell>
                <StyledTableCell>{order.totalPrice}</StyledTableCell>
                <StyledTableCell>{order.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={orderList?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default AdminPageOrderTable;
