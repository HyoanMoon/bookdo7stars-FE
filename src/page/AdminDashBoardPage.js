import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// 스타일 설정
const Root = styled('div')(({ theme }) => ({
  display: 'flex',
}));

const ContainerStyled = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  overflow: 'auto',
  flexDirection: 'column',
  cursor: 'pointer', // 클릭 가능한 커서
}));

// 간단한 카드 컴포넌트
function SimpleCard({ title, content, onClick }) {
  return (
    <PaperStyled onClick={onClick}>
      <Typography variant="h6">{title}</Typography>
      <Typography>{content}</Typography>
    </PaperStyled>
  );
}

function AdminDashBoardPage() {
  const [open, setOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', role: 'viewer' });
  const [adminData, setAdminData] = useState([
    { id: 1, name: 'Admin 1', role: 'superadmin' },
    { id: 2, name: 'Admin 2', role: 'editor' },
    { id: 3, name: 'Admin 3', role: 'viewer' },
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRoleChange = (id, event) => {
    setAdminData(adminData.map((admin) => (admin.id === id ? { ...admin, role: event.target.value } : admin)));
  };

  const handleNameChange = (id, event) => {
    setAdminData(adminData.map((admin) => (admin.id === id ? { ...admin, name: event.target.value } : admin)));
  };

  const handleDelete = (id) => {
    setAdminData(adminData.filter((admin) => admin.id !== id));
  };

  const handleAddAdmin = () => {
    const newId = adminData.length ? adminData[adminData.length - 1].id + 1 : 1;
    setAdminData([...adminData, { id: newId, ...newAdmin }]);
    setNewAdmin({ name: '', role: 'viewer' });
  };

  return (
    <Root>
      <ContainerStyled maxWidth="lg">
        <Grid container spacing={3}>
          {/* 개요 섹션 */}
          <Grid item xs={12} md={4}>
            <SimpleCard title="총 매출" content="₩100,000" />
          </Grid>
          <Grid item xs={12} md={4}>
            <SimpleCard title="신규 주문 수" content="15" />
          </Grid>
          <Grid item xs={12} md={4}>
            <SimpleCard title="총 주문 수" content="150" />
          </Grid>

          {/* 주문 관리 */}
          <Grid item xs={12}>
            <SimpleCard title="최근 주문" content="최근 주문 내역을 여기에 표시합니다." />
          </Grid>

          {/* 고객 관리 */}
          <Grid item xs={12} md={6}>
            <SimpleCard title="신규 가입 고객" content="5명" />
          </Grid>
          <Grid item xs={12} md={6}>
            <SimpleCard title="고객 문의" content="3건" />
          </Grid>

          {/* 재고 관리 */}
          <Grid item xs={12}>
            <SimpleCard title="재고 부족 품목" content="재고가 부족한 품목을 여기에 표시합니다." />
          </Grid>

          {/* 판매 분석 */}
          <Grid item xs={12}>
            <SimpleCard title="판매 분석" content="판매 데이터를 여기에 표시합니다." onClick={handleClickOpen} />
          </Grid>

          {/* 모달 */}
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>어드민 권한 관리</DialogTitle>
            <DialogContent>
              <DialogContentText>어드민을 보여주고 어드민의 정보를 수정 할 수 있는 테이블</DialogContentText>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>이름</TableCell>
                      <TableCell>역할</TableCell>
                      <TableCell>작업</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {adminData.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell>{admin.id}</TableCell>
                        <TableCell>
                          <TextField value={admin.name} onChange={(event) => handleNameChange(admin.id, event)} variant="outlined" size="small" />
                        </TableCell>
                        <TableCell>
                          <FormControl variant="outlined" size="small" fullWidth>
                            <InputLabel>역할</InputLabel>
                            <Select value={admin.role} onChange={(event) => handleRoleChange(admin.id, event)} label="역할">
                              <MenuItem value="superadmin">Super Admin</MenuItem>
                              <MenuItem value="editor">Editor</MenuItem>
                              <MenuItem value="viewer">Viewer</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleDelete(admin.id)} color="secondary">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>새 ID</TableCell>
                      <TableCell>
                        <TextField
                          value={newAdmin.name}
                          onChange={(event) => setNewAdmin({ ...newAdmin, name: event.target.value })}
                          variant="outlined"
                          size="small"
                          placeholder="새 어드민 이름"
                        />
                      </TableCell>
                      <TableCell>
                        <FormControl variant="outlined" size="small" fullWidth>
                          <InputLabel>역할</InputLabel>
                          <Select value={newAdmin.role} onChange={(event) => setNewAdmin({ ...newAdmin, role: event.target.value })} label="역할">
                            <MenuItem value="superadmin">Super Admin</MenuItem>
                            <MenuItem value="editor">Editor</MenuItem>
                            <MenuItem value="viewer">Viewer</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={handleAddAdmin} color="primary">
                          <AddIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                닫기
              </Button>
            </DialogActions>
          </Dialog>

          {/* 기타 섹션들 */}
          {/* 더 많은 섹션을 필요에 따라 추가하세요 */}
        </Grid>
      </ContainerStyled>
    </Root>
  );
}

export default AdminDashBoardPage;
