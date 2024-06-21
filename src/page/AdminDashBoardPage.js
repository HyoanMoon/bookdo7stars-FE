import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Line, Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../style/adminDashboardPageStyles.css';
import AdminDashboardCard from '../components/AdminDashboardCard';
import { userActions } from '../action/userActions';
import UserPermissionsModal from '../components/UserPermissionsModal'; // 사용자 권한 모달 임포트
import AdminPermissionsModal from '../components/AdminPermissionsModal'; // 어드민 권한 모달 임포트
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'IBM Plex Sans KR, sans-serif',
  },
});

function AdminDashBoardPage() {
  const dispatch = useDispatch();
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openAdminModal, setOpenAdminModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ userName: '', email: '', password: '', role: 'admin' });

  // Redux 상태에서 데이터 가져오기
  const adminData = useSelector((state) => state.user.users);
  const [localUserData, setLocalUserData] = useState([]);
  const [localAdminData, setLocalAdminData] = useState([]);

  useEffect(() => {
    if (openUserModal) {
      dispatch(userActions.getAllUser());
    }
    if (openAdminModal) {
      dispatch(userActions.adminUser());
    }
  }, [openUserModal, openAdminModal, dispatch]);

  useEffect(() => {
    if (adminData) {
      setLocalUserData(adminData.filter((user) => user.role !== 'admin'));
      setLocalAdminData(adminData.filter((admin) => admin.role === 'admin'));
    }
  }, [adminData]);

  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: '총 매출',
        data: [30000, 40000, 50000, 60000, 70000, 80000],
        borderColor: '#3e95cd',
        fill: false,
      },
    ],
  };

  const orderData = {
    labels: ['Pending', 'Completed', 'Cancelled'],
    datasets: [
      {
        label: '주문 상태',
        data: [10, 60, 5],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const userData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: '신규 가입자 수',
        data: [5, 10, 8, 12],
        borderColor: '#8e5ea2',
        fill: false,
      },
    ],
  };

  const inquiryData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: '고객 문의 수',
        data: [2, 4, 6, 8],
        backgroundColor: '#FF6384',
      },
    ],
  };

  const handleClickOpenUserModal = () => {
    setOpenUserModal(true);
  };

  const handleCloseUserModal = () => {
    setOpenUserModal(false);
  };

  const handleClickOpenAdminModal = () => {
    setOpenAdminModal(true);
  };

  const handleCloseAdminModal = () => {
    setOpenAdminModal(false);
  };

  const handleEmailChange = (id, event) => {
    setLocalAdminData(localAdminData.map((admin) => (admin._id === id ? { ...admin, email: event.target.value } : admin)));
  };

  const handlePasswordChange = (id, event) => {
    setLocalAdminData(localAdminData.map((admin) => (admin._id === id ? { ...admin, password: event.target.value } : admin)));
  };

  const handleNameChange = (id, event) => {
    setLocalAdminData(localAdminData.map((admin) => (admin._id === id ? { ...admin, userName: event.target.value } : admin)));
  };

  const handleRoleChange = (id, event) => {
    setLocalAdminData(localAdminData.map((admin) => (admin._id === id ? { ...admin, role: event.target.value } : admin)));
  };

  const handleUserNameChange = (id, event) => {
    setLocalUserData(localUserData.map((user) => (user._id === id ? { ...user, userName: event.target.value } : user)));
  };

  const handleUserRoleChange = (id, event) => {
    setLocalUserData(localUserData.map((user) => (user._id === id ? { ...user, role: event.target.value } : user)));
  };

  const handleUserLevelChange = (id, event) => {
    setLocalUserData(localUserData.map((user) => (user._id === id ? { ...user, level: event.target.value } : user)));
  };

  const handleDelete = (id) => {
    setLocalAdminData(localAdminData.filter((admin) => admin._id !== id));
    setLocalUserData(localUserData.filter((user) => user._id !== id));
  };

  const handleAddAdmin = () => {
    dispatch(userActions.registerAdmin(newAdmin));
    setNewAdmin({ userName: '', email: '', password: '', role: 'admin' });
  };

  // 관리자 카드의 내용을 동적으로 생성
  const adminCardContent = localAdminData.length > 0 ? `${localAdminData[0].userName} 외 ${localAdminData.length - 1}명` : 'No admins';
  const userCardContent = localUserData.length > 0 ? `Total: ${localUserData.length}명` : 'No users';

  return (
    <ThemeProvider theme={theme}>
      <div className="root">
        <Container className="containerStyled" maxWidth="lg">
          <Grid container spacing={3}>
            {/* 개요 섹션 */}
            <Grid item xs={12} md={4}>
              <AdminDashboardCard title="총 매출" content={<Line data={salesData} />} />
            </Grid>
            <Grid item xs={12} md={4}>
              <AdminDashboardCard title="주문 상태" content={<Pie data={orderData} />} />
            </Grid>
            <Grid item xs={12} md={4}>
              <AdminDashboardCard title="총 주문 수" content="150" />
            </Grid>

            {/* 주문 관리 */}
            <Grid item xs={12}>
              <AdminDashboardCard title="최근 주문" content="최근 주문 내역을 여기에 표시합니다." />
            </Grid>

            {/* 고객 관리 */}
            <Grid item xs={12} md={6}>
              <AdminDashboardCard title="신규 가입 고객" content={<Line data={userData} />} />
            </Grid>
            <Grid item xs={12} md={6}>
              <AdminDashboardCard title="고객 문의" content={<Bar data={inquiryData} />} />
            </Grid>

            {/* 재고 관리 */}
            <Grid item xs={12}>
              <AdminDashboardCard title="재고 부족 품목" content="재고가 부족한 품목을 여기에 표시합니다." />
            </Grid>

            {/* 권한 관리 */}
            <Grid item xs={12} md={6}>
              <AdminDashboardCard title="사용자 권한 관리" content={userCardContent} onClick={handleClickOpenUserModal} />
            </Grid>
            <Grid item xs={12} md={6}>
              <AdminDashboardCard title="어드민 권한 관리" content={adminCardContent} onClick={handleClickOpenAdminModal} />
            </Grid>

            {/* 사용자 권한 모달 컴포넌트 */}
            <UserPermissionsModal
              open={openUserModal}
              handleClose={handleCloseUserModal}
              userData={localUserData}
              handleNameChange={handleUserNameChange}
              handleRoleChange={handleUserRoleChange}
              handleLevelChange={handleUserLevelChange}
              handleDelete={handleDelete}
            />

            {/* 어드민 권한 모달 컴포넌트 */}
            <AdminPermissionsModal
              open={openAdminModal}
              handleClose={handleCloseAdminModal}
              adminData={localAdminData}
              newAdmin={newAdmin}
              handleEmailChange={handleEmailChange}
              handlePasswordChange={handlePasswordChange}
              handleNameChange={handleNameChange}
              handleRoleChange={handleRoleChange}
              handleDelete={handleDelete}
              handleAddAdmin={handleAddAdmin}
              setNewAdmin={setNewAdmin}
            />

            {/* 기타 섹션들 */}
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default AdminDashBoardPage;
