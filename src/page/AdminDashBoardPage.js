import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid } from '@mui/material';
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

  // 각 달의 가입자 수 계산
  const getMonthlySignups = (year, month) => {
    return localUserData.filter((user) => {
      const date = new Date(user.createdAt);
      return date.getFullYear() === year && date.getMonth() === month;
    }).length;
  };

  const today = new Date();
  const currentMonth = today.getMonth(); // 현재 월 (0이 1월이므로 0부터 시작)
  const currentYear = today.getFullYear();

  const lastMonth = (currentMonth - 1 + 12) % 12;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const twoMonthsAgo = (currentMonth - 2 + 12) % 12;
  const twoMonthsAgoYear = currentMonth <= 1 ? currentYear - 1 : currentYear;

  const threeMonthsAgo = (currentMonth - 3 + 12) % 12;
  const threeMonthsAgoYear = currentMonth <= 2 ? currentYear - 1 : currentYear;

  const currentMonthSignups = getMonthlySignups(currentYear, currentMonth);
  const lastMonthSignups = getMonthlySignups(lastMonthYear, lastMonth);
  const twoMonthsAgoSignups = getMonthlySignups(twoMonthsAgoYear, twoMonthsAgo);
  const threeMonthsAgoSignups = getMonthlySignups(threeMonthsAgoYear, threeMonthsAgo);

  // 월 이름 배열
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  const signupData = {
    labels: [monthNames[threeMonthsAgo], monthNames[twoMonthsAgo], monthNames[lastMonth], monthNames[currentMonth]],
    datasets: [
      {
        label: `${currentYear}년 가입자 수`,
        data: [threeMonthsAgoSignups, twoMonthsAgoSignups, lastMonthSignups, currentMonthSignups],
        backgroundColor: ['#ff9800', '#4caf50', '#2196f3', '#f44336'],
        barThickness: 15, // 막대 너비 설정
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

  const handleUserChange = (id, event) => {
    const { name, value } = event.target;
    setLocalUserData((prevUserData) => prevUserData.map((user) => (user._id === id ? { ...user, [name]: value } : user)));
  };

  const handleDelete = (id) => {
    setLocalAdminData(localAdminData.filter((admin) => admin._id !== id));
    setLocalUserData(localUserData.filter((user) => user._id !== id));
  };

  const handleAddAdmin = () => {
    dispatch(userActions.registerAdmin(newAdmin));
    setNewAdmin({ userName: '', email: '', password: '', role: 'admin' });
  };

  // Edit 버튼을 클릭했을 때 dispatch
  const handleEdit = (id) => {
    const user = localUserData.find((user) => user._id === id);
    if (user) {
      dispatch(userActions.updateUserLevel(user._id, user.level));
    }
  };

  // 관리자 카드의 내용을 동적으로 생성
  const adminCardContent = localAdminData.length > 0 ? `${localAdminData[0].userName} 외 ${localAdminData.length - 1}명` : 'No admins';
  const userCardContent = localUserData.length > 0 ? `Total: ${localUserData.length}명` : 'No users';

  return (
    <ThemeProvider theme={theme}>
      <div className="root">
        <Container className="containerStyled" maxWidth="lg">
          <Grid container spacing={3}>
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
              <AdminDashboardCard title="신규 가입 고객" content={<Bar data={signupData} />} />
            </Grid>
            <Grid item xs={12} md={6}>
              <AdminDashboardCard title="고객 문의" content={<Bar data={inquiryData} />} />
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
              handleLevelChange={handleUserChange}
              handleDelete={handleDelete}
              handleEdit={handleEdit} // handleEdit 함수 전달
            />

            {/* 어드민 권한 모달 컴포넌트 */}
            <AdminPermissionsModal
              open={openAdminModal}
              handleClose={handleCloseAdminModal}
              adminData={localAdminData}
              newAdmin={newAdmin}
              handleEmailChange={handleUserChange}
              handlePasswordChange={handleUserChange}
              handleNameChange={handleUserChange}
              handleRoleChange={handleUserChange}
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
